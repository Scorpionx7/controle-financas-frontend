// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router'; // Adicione RouterLink aqui também!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, // <- O RouterOutlet é crucial para exibir o conteúdo das rotas
    RouterLink // <- ESSENCIAL: Importar RouterLink para que [routerLink] funcione
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'controle-financas-frontend';
}