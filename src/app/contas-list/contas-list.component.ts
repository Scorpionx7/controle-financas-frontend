// src/app/contas-list/contas-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Conta } from '../models/conta.model'; // Ajuste o caminho se sua pasta `models` estiver em outro local
import { ContaService } from '../services/conta.service'; // Ajuste o caminho para o seu `services`
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-contas-list',
  standalone: true, // Indica que é um componente standalone
  imports: [CommonModule, RouterLink], // Adicione CommonModule aos imports
  templateUrl: './contas-list.component.html',
  styleUrl: './contas-list.component.css'
})
export class ContasListComponent implements OnInit {
  contas: Conta[] = []; // Array para armazenar as contas

  constructor(private contaService: ContaService) { } // Injeta o ContaService

  ngOnInit(): void {
    this.getContas(); // Chama o método para buscar as contas ao iniciar o componente
  }

  getContas(): void {
    this.contaService.getContas().subscribe({
      next: (data) => {
        this.contas = data;
        console.log('Contas carregadas:', data);
      },
      error: (error) => {
        console.error('Erro ao carregar contas:', error);
        // Implementar tratamento de erro na UI, como exibir uma mensagem para o usuário
      }
    });
  }
  
  deletarConta(id: number | undefined): void {
  if (!id) {
    console.error('ID inválido:', id);
    return;
  }

  if (confirm('Tem certeza que deseja deletar esta conta?')) {
    this.contaService.deletarConta(id).subscribe({
      next: () => {
        console.log('Conta deletada com sucesso');
        // Atualiza a lista local sem precisar recarregar do servidor
        this.contas = this.contas.filter(conta => conta.id !== id);
      },
      error: (error) => {
        console.error('Erro completo:', error);
        if (error.status === 404) {
          alert('Conta não encontrada. Talvez já tenha sido deletada.');
        } else {
          alert(`Erro ao deletar conta: ${error.message}`);
        }
      }
    });
  }
}

debugConta(conta: Conta): void {
  console.log('Dados da conta sendo editada:', conta);
  console.log('ID sendo passado:', conta.id);
}

}