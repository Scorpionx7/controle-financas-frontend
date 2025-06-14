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
  console.log('Iniciando carregamento da conta ID:', id);
  
  this.contaService.getContaById(id).subscribe({
    next: (data) => {
      console.log('Dados recebidos:', data);
      // Garanta que os dados estão no formato correto
      this.conta = {
        id: data.id,
        nome: data.nome || '',
        saldo: data.saldo || 0,
        limite: data.limite || 0,
        valeAlimentacao: data.valeAlimentacao || 0
      };
      console.log('Dados atribuídos ao formulário:', this.conta);
    },
    error: (error) => {
      console.error('Erro detalhado:', error);
      alert('Conta não encontrada ou erro de conexão');
      this.router.navigate(['/contas']);
    }
  });
}

onSubmit(): void {
  if (!this.conta) return;

  const operation = this.isEditMode && this.contaId 
    ? this.contaService.atualizarConta(this.contaId, this.conta)
    : this.contaService.salvarConta(this.conta);

  operation.subscribe({
    next: (response) => {
      console.log('Resposta do servidor:', response); // Debug
      alert(this.isEditMode ? 'Conta atualizada!' : 'Conta criada!');
      this.router.navigate(['/contas']);
    },
    error: (error) => {
      console.error('Erro completo:', error); // Debug detalhado
      alert(`Erro: ${error.message || 'Erro desconhecido'}`);
    }
  });
}

}