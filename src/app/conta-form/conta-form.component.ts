// src/app/conta-form/conta-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas comuns como ngIf, ngFor
import { FormsModule } from '@angular/forms'; // Para usar ngModel em formulários
import { ContaService } from '../services/conta.service'; // Importa o serviço de contas
import { Conta } from '../models/conta.model'; // Importa a interface da conta

@Component({
  selector: 'app-conta-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicione FormsModule aqui
  templateUrl: './conta-form.component.html',
  styleUrl: './conta-form.component.css'
})
export class ContaFormComponent {
  // Objeto que irá armazenar os dados do formulário
  novaConta: Conta = {
    nome: '',
    saldo: 0,
    limite: 0,
    valeAlimentacao: 0
  };

  constructor(private contaService: ContaService) { }

  onSubmit(): void {
    this.contaService.salvarConta(this.novaConta).subscribe({
      next: (response) => {
        console.log('Conta salva com sucesso:', response);
        alert('Conta salva com sucesso!');
        // Opcional: Resetar o formulário ou redirecionar
        this.novaConta = {
          nome: '',
          saldo: 0,
          limite: 0,
          valeAlimentacao: 0
        };
      },
      error: (error) => {
        console.error('Erro ao salvar conta:', error);
        alert('Erro ao salvar conta: ' + error.message);
      }
    });
  }
}