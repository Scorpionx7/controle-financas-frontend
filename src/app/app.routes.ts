// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ContasListComponent } from './contas-list/contas-list.component';
import { ContaFormComponent } from './conta-form/conta-form.component'; 
import { CartaoFormComponent } from './cartao-form/cartao-form.component';
import { CartoesListComponent } from './cartoes-list/cartoes-list.component';


export const routes: Routes = [
  { path: '', component: ContasListComponent }, 
  { path: 'contas/nova', component: ContaFormComponent }, 
  { path: 'cartoes/novo', component: CartaoFormComponent },
   { path: 'cartoes', component: CartoesListComponent }, 
  { path: '**', redirectTo: '' } 
];