// src/app/cartao-form/cartao-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartaoDeCredito } from '../models/cartao.model'; // Importa a interface CartaoDeCredito
import { CartaoService } from '../services/cartao.service'; // Importa o serviço de cartões
import { Conta } from '../models/conta.model'; // Importa a interface Conta
import { ContaService } from '../services/conta.service'; // Importa o serviço de contas

@Component({
  selector: 'app-cartao-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartao-form.component.html',
  styleUrl: './cartao-form.component.css'
})
export class CartaoFormComponent implements OnInit {
  novoCartao: CartaoDeCredito = {
    nome: '',
    limite: 0,
    gastoAtual: 0 // Gasto inicial é zero
  };
  contasDisponiveis: Conta[] = []; // Para preencher o ComboBox de contas
  contaSelecionadaId: number | undefined; // Para armazenar o ID da conta selecionada

  constructor(
    private cartaoService: CartaoService,
    private contaService: ContaService // Injeta o ContaService para buscar contas
  ) { }

  ngOnInit(): void {
    this.carregarContas(); // Carrega as contas ao iniciar o componente
  }

  carregarContas(): void {
    this.contaService.getContas().subscribe({
      next: (data) => {
        this.contasDisponiveis = data;
        console.log('Contas disponíveis para associação:', data);
      },
      error: (error) => {
        console.error('Erro ao carregar contas para associação:', error);
        alert('Erro ao carregar contas: ' + (error.error?.message || error.message));
      }
    });
  }

  onSubmit(): void {
    // Primeiro, salve o cartão
    this.cartaoService.salvarCartao(this.novoCartao).subscribe({
      next: (cartaoSalvo) => {
        console.log('Cartão salvo com sucesso:', cartaoSalvo);
        alert('Cartão salvo com sucesso!');

        // Tenta vincular o cartão APENAS se uma conta foi selecionada E o cartão foi salvo com um ID
        if (this.contaSelecionadaId !== undefined && cartaoSalvo.id !== undefined) {
          this.cartaoService.vincularCartaoAConta(this.contaSelecionadaId, cartaoSalvo.id).subscribe({
            next: () => {
              console.log('Cartão vinculado à conta com sucesso!');
              alert('Cartão vinculado à conta com sucesso!');
              // Após vincular, resetar para limpar o formulário
              this.resetForm();
            },
            error: (error) => {
              console.error('Erro ao vincular cartão à conta:', error);
              // Erro pode ser mais específico se o backend retornar uma mensagem
              alert('Erro ao vincular cartão: ' + (error.error?.message || error.message));
              // Opcional: Se a vinculação falhar, você pode decidir se quer resetar o formulário ou não
              this.resetForm();
            }
          });
        } else {
          // Se nenhuma conta foi selecionada ou o cartão não tem ID (o que seria um erro)
          console.log('Cartão salvo, mas não vinculado (nenhuma conta selecionada ou ID do cartão ausente).');
          this.resetForm(); // Resetar de qualquer forma
        }
      },
      error: (error) => {
        console.error('Erro ao salvar cartão:', error);
        alert('Erro ao salvar cartão: ' + (error.error?.message || error.message));
      }
    });
  }

// Adicione um método para resetar o formulário
  resetForm(): void {
    this.novoCartao = {
      nome: '',
      limite: 0,
      gastoAtual: 0
    };
    this.contaSelecionadaId = undefined; // Reseta a seleção do dropdown
  }
}