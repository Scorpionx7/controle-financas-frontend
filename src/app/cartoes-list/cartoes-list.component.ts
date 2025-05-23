// src/app/cartoes-list/cartoes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CartaoDeCredito } from '../models/cartao.model';
import { CartaoService } from '../services/cartao.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cartoes-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cartoes-list.component.html',
  styleUrl: './cartoes-list.component.css'
})
export class CartoesListComponent implements OnInit {
  cartoes: CartaoDeCredito[] = [];

  constructor(private cartaoService: CartaoService) { }

  ngOnInit(): void {
    this.getCartoes();
  }

  getCartoes(): void {
    this.cartaoService.getCartoes().subscribe({
      next: (data) => {
        this.cartoes = data;
        console.log('Cartões carregados:', data);
      },
      error: (error) => {
        console.error('Erro ao carregar cartões:', error);
        alert('Erro ao carregar cartões: ' + (error.error?.message || error.message));
      }
    });
  }

  deletarCartao(id: number | undefined): void {
    if (id === undefined) {
      alert('ID do cartão é indefinido. Não é possível deletar.');
      return;
    }

    if (confirm('Tem certeza que deseja deletar este cartão? Esta ação é irreversível.')) {
      this.cartaoService.deletarCartao(id).subscribe({
        next: () => {
          alert('Cartão deletado com sucesso!');
          this.getCartoes(); 
        },
        error: (error: any) => {
          console.error('Erro ao deletar cartão:', error);
          alert('Erro ao deletar cartão: ' + (error.error?.message || error.message));
        }
      });
    }
  }

}