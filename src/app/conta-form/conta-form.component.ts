// src/app/conta-form/conta-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContaService } from '../services/conta.service';
import { Conta } from '../models/conta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs'; // Importar Observable do rxjs

@Component({
  selector: 'app-conta-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conta-form.component.html',
  styleUrl: './conta-form.component.css'
})
export class ContaFormComponent implements OnInit {
  conta: Conta = { // Renomeado de novaConta para conta
    nome: '',
    saldo: 0,
    limite: 0,
    valeAlimentacao: 0
  };
  isEditMode: boolean = false; // Flag para saber se está editando ou criando
  contaId: number | null = null; // Para armazenar o ID da conta em edição

  constructor(
    private contaService: ContaService,
    private route: ActivatedRoute, // Para acessar parâmetros da rota
    private router: Router // Para navegação programática
  ) { }

  ngOnInit(): void {
    // Usa snapshot para pegar o ID imediatamente na inicialização
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.contaId = +idParam; // Converte string para number
      this.isEditMode = true;
      this.carregarConta(this.contaId);
    }
  }

  carregarConta(id: number): void {
    this.contaService.getContaById(id).subscribe({
      next: (data: Conta) => {
        this.conta = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar conta para edição:', error);
        // Mensagem mais clara
        alert('Erro ao carregar conta para edição. Verifique se o ID está correto ou se a conta existe. Detalhes: ' + (error.message || 'Erro desconhecido.'));
        this.router.navigate(['/']); // Redireciona para a lista
      }
    });
  }

  onSubmit(): void {
    let operation: Observable<Conta>;

    // Garante que o contaId é um número válido para edição
    if (this.isEditMode && this.contaId !== null && this.contaId > 0) {
      operation = this.contaService.atualizarConta(this.contaId, this.conta);
    } else {
      operation = this.contaService.salvarConta(this.conta);
    }

    operation.subscribe({
      next: (response: Conta) => {
        const message = this.isEditMode ? 'Conta atualizada com sucesso!' : 'Conta salva com sucesso!';
        alert(message);
        console.log(message, response);
        this.router.navigate(['/']); // Redireciona para a lista de contas
      },
      error: (error: any) => {
        console.error('Erro ao salvar/atualizar conta:', error);
        alert('Erro ao salvar/atualizar conta: ' + (error.error?.message || error.message));
      }
    });
  }
}