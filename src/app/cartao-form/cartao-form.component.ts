// src/app/cartao-form/cartao-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartaoDeCredito } from '../models/cartao.model';
import { CartaoService } from '../services/cartao.service';
import { Conta } from '../models/conta.model';
import { ContaService } from '../services/conta.service';
import { ActivatedRoute, Router } from '@angular/router'; // IMPORTAR ActivatedRoute e Router
import { Observable } from 'rxjs'; // IMPORTAR Observable

@Component({
  selector: 'app-cartao-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartao-form.component.html',
  styleUrl: './cartao-form.component.css'
})
export class CartaoFormComponent implements OnInit {
  cartao: CartaoDeCredito = { // Renomeado de novoCartao para cartao
    nome: '',
    limite: 0,
    gastoAtual: 0
  };
  contasDisponiveis: Conta[] = [];
  contaSelecionada: Conta | null = null;
  isEditMode: boolean = false; // Flag para saber se está editando ou criando
  cartaoId: number | null = null; // Para armazenar o ID do cartão em edição

  constructor(
    private cartaoService: CartaoService,
    private contaService: ContaService,
    private route: ActivatedRoute, // Para acessar parâmetros da rota
    private router: Router // Para navegação programática
  ) { }

  ngOnInit(): void {
    this.carregarContas();

    // Verifica se há um ID na URL (modo de edição)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.cartaoId = +idParam; // Converte string para number
      this.isEditMode = true;
      this.carregarCartao(this.cartaoId); // Carrega os dados do cartão para edição
    }
  }

  carregarContas(): void {
    this.contaService.getContas().subscribe({
      next: (data: Conta[]) => {
        this.contasDisponiveis = data;
        console.log('Contas disponíveis para associação:', data);
        // Se estiver em modo de edição e o cartão já tiver uma conta associada, pré-selecionar
        if (this.isEditMode && this.cartao.conta && this.cartao.conta.id) {
            this.contaSelecionada = this.contasDisponiveis.find(c => c.id === this.cartao.conta?.id) || null;
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar contas para associação:', error);
        alert('Erro ao carregar contas: ' + (error.error?.message || error.message));
      }
    });
  }

  carregarCartao(id: number): void {
    this.cartaoService.getCartaoById(id).subscribe({
      next: (data: CartaoDeCredito) => {
        this.cartao = data; // Preenche o formulário com os dados do cartão
        // Tenta pré-selecionar a conta se ela já estiver carregada
        if (this.cartao.conta && this.cartao.conta.id && this.contasDisponiveis.length > 0) {
            this.contaSelecionada = this.contasDisponiveis.find(c => c.id === this.cartao.conta?.id) || null;
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar cartão para edição:', error);
        alert('Erro ao carregar cartão: ' + (error.error?.message || error.message));
        this.router.navigate(['/cartoes']); // Redireciona se não conseguir carregar
      }
    });
  }


  onSubmit(): void {
    let operation: Observable<CartaoDeCredito>;

    if (this.isEditMode && this.cartaoId !== null && this.cartaoId > 0) {
      operation = this.cartaoService.atualizarCartao(this.cartaoId, this.cartao); // ATUALIZAR
    } else {
      operation = this.cartaoService.salvarCartao(this.cartao); // SALVAR (NOVO)
    }

    operation.subscribe({
      next: (cartaoSalvo: CartaoDeCredito) => { // Tipagem explícita
        const message = this.isEditMode ? 'Cartão atualizado com sucesso!' : 'Cartão salvo com sucesso!';
        console.log(message, cartaoSalvo);

        // Vinculação da conta (se selecionada)
        if (this.contaSelecionada && this.contaSelecionada.id !== undefined && cartaoSalvo.id !== undefined) {
          this.cartaoService.vincularCartaoAConta(this.contaSelecionada.id, cartaoSalvo.id).subscribe({
            next: () => {
              alert(message + ' E vinculado à conta com sucesso!');
              this.router.navigate(['/cartoes']);
            },
            error: (error: any) => {
              console.error('Erro ao vincular cartão à conta:', error);
              alert(message + ' Mas houve um erro ao vincular: ' + (error.error?.message || error.message));
              this.router.navigate(['/cartoes']);
            }
          });
        } else {
          alert(message);
          this.router.navigate(['/cartoes']); // Redireciona após salvar/atualizar
        }
      },
      error: (error: any) => {
        console.error('Erro ao salvar/atualizar cartão:', error);
        alert('Erro ao salvar/atualizar cartão: ' + (error.error?.message || error.message));
      }
    });
  }

  resetForm(): void {
    this.cartao = {
      nome: '',
      limite: 0,
      gastoAtual: 0
    };
    this.contaSelecionada = null;
    this.isEditMode = false;
    this.cartaoId = null;
  }
}