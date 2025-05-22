// src/app/cartoes-list/cartoes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngFor
import { CartaoDeCredito } from '../models/cartao.model';
import { CartaoService } from '../services/cartao.service';

@Component({
  selector: 'app-cartoes-list',
  standalone: true,
  imports: [CommonModule],
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
}