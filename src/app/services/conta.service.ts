// src/app/services/conta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

import { Conta } from '../models/conta.model';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private apiUrl = 'http://localhost:8080/contas';

  constructor(private http: HttpClient) { }

  getContas(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl);
  }

  getContaById(id: number): Observable<Conta> { 
    return this.http.get<Conta>(`${this.apiUrl}/${id}`);
  }

  salvarConta(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.apiUrl, conta);
  }

  atualizarConta(id: number, conta: Conta): Observable<Conta> { 
    return this.http.put<Conta>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`, conta);
  }

  deletarConta(id: number): Observable<void> { 
    return this.http.delete<void>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }
}