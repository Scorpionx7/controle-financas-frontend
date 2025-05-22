// src/app/cartao-form/cartao-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartaoDeCredito } from '../models/cartao.model';
import { CartaoService } from '../services/cartao.service';
import { Conta } from '../models/conta.model';
import { ContaService } from '../services/conta.service';

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
    gastoAtual: 0
  };
  contasDisponiveis: Conta[] = [];
  contaSelecionada: Conta | null = null; 

  constructor(
    private cartaoService: CartaoService,
    private contaService: ContaService
  ) { }

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas(): void {
    this.contaService.getContas().subscribe({
      next: (data) => {
        this.contasDisponiveis = data;
        // Se houver contas, você pode querer pré-selecionar a primeira ou nenhuma
        // this.contaSelecionada = data.length > 0 ? data[0] : null;
        console.log('Contas disponíveis para associação:', data);
      },
      error: (error) => {
        console.error('Erro ao carregar contas para associação:', error);
        alert('Erro ao carregar contas: ' + (error.error?.message || error.message));
      }
    });
  }

  onSubmit(): void {
    if (!this.novoCartao.nome || this.novoCartao.limite <= 0) {
      alert('Por favor, preencha o nome e um limite válido para o cartão.');
      return;
    }

    this.cartaoService.salvarCartao(this.novoCartao).subscribe({
      next: (cartaoSalvo) => {
        console.log('Cartão salvo com sucesso:', cartaoSalvo);

        // AQUI A MUDANÇA: usa o ID da conta selecionada e o ID do cartão salvo
        if (this.contaSelecionada && this.contaSelecionada.id !== undefined && cartaoSalvo.id !== undefined) {
          this.cartaoService.vincularCartaoAConta(this.contaSelecionada.id, cartaoSalvo.id).subscribe({
            next: () => {
              alert('Cartão salvo e vinculado à conta com sucesso!');
              this.resetForm();
            },
            error: (error) => {
              console.error('Erro ao vincular cartão à conta:', error);
              const errorMessage = error.error?.message || 'Erro desconhecido ao vincular cartão.';
              alert('Cartão salvo, mas houve um erro ao vincular: ' + errorMessage);
              this.resetForm();
            }
          });
        } else {
          alert('Cartão salvo com sucesso! Nenhuma conta foi selecionada para vincular.');
          this.resetForm();
        }
      },
      error: (error) => {
        console.error('Erro ao salvar cartão:', error);
        const errorMessage = error.error?.message || 'Erro desconhecido ao salvar cartão.';
        alert('Erro ao salvar cartão: ' + errorMessage);
      }
    });
  }

  resetForm(): void {
    this.novoCartao = {
      nome: '',
      limite: 0,
      gastoAtual: 0
    };
    this.contaSelecionada = null; // Reseta a seleção do dropdown para null
  }
}