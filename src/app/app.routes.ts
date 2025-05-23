// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ContasListComponent } from './contas-list/contas-list.component';
import { ContaFormComponent } from './conta-form/conta-form.component'; 
import { CartaoFormComponent } from './cartao-form/cartao-form.component';
import { CartoesListComponent } from './cartoes-list/cartoes-list.component';


export const routes: Routes = [
  { path: '', component: ContasListComponent }, 
  { path: 'contas/nova', component: ContaFormComponent },
  { path: 'contas/editar/:id', component: ContaFormComponent },  
  { path: 'cartoes/novo', component: CartaoFormComponent },
  { path: 'cartoes', component: CartoesListComponent }, 
  { path: 'cartoes/novo', component: CartaoFormComponent }, // Rota para criar novo cartão
  { path: 'cartoes/editar/:id', component: CartaoFormComponent }, // NOVA ROTA PARA EDIÇÃO DE CARTÃO
  { path: '**', redirectTo: '' } 
];