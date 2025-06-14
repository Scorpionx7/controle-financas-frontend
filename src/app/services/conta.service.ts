// src/app/services/conta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; 
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
  const url = `${this.apiUrl}/${id}`;
  console.log('URL da requisição GET:', url);
  return this.http.get<Conta>(url).pipe(
    tap({
      next: data => console.log('Dados recebidos do backend:', data),
      error: err => console.error('Erro na requisição GET:', err)
    })
  );
}

  salvarConta(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.apiUrl, conta);
  }

  atualizarConta(id: number, conta: Conta): Observable<Conta> {
  const url = `${this.apiUrl}/${id}`;
  console.log('URL da requisição PUT:', url, 'Dados:', conta);
  
  return this.http.put<Conta>(url, conta).pipe(
    tap({
      next: response => console.log('Resposta do PUT:', response),
      error: err => console.error('Erro na requisição PUT:', err)
    })
  );
}

 deletarConta(id: number): Observable<void> {
  // Opção 1: Enviando o ID na URL (recomendado para DELETE)
  return this.http.delete<void>(`${this.apiUrl}/${id}`);

  // Opção 2: Alternativa com params (se a anterior não funcionar)
  // return this.http.delete<void>(this.apiUrl, { params: { id: id.toString() } });
}
  

  vincularCartaoAConta(contaId: number, cartaoId: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/${contaId}/cartoes/${cartaoId}`, 
      null, 
      { responseType: 'text' as 'json' }
    );
  }
}