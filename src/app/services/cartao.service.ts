// src/app/services/cartao.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartaoDeCredito } from '../models/cartao.model';
import { Conta } from '../models/conta.model'; 

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private apiUrl = 'http://localhost:8080/cartoes';
  private contasApiUrl = 'http://localhost:8080/contas';

  constructor(private http: HttpClient) { }

  getCartoes(): Observable<CartaoDeCredito[]> {
    return this.http.get<CartaoDeCredito[]>(this.apiUrl);
  }

  getCartaoById(id: number): Observable<CartaoDeCredito> {
    return this.http.get<CartaoDeCredito>(`${this.apiUrl}/${id}`);
  }

  salvarCartao(cartao: CartaoDeCredito): Observable<CartaoDeCredito> {
    return this.http.post<CartaoDeCredito>(this.apiUrl, cartao);
  }

  atualizarCartao(id: number, cartao: CartaoDeCredito): Observable<CartaoDeCredito> {
    return this.http.put<CartaoDeCredito>(`${this.apiUrl}/${id}`, cartao);
  }

  deletarCartao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  vincularCartaoAConta(contaId: number, cartaoId: number): Observable<string> {
    const url = `${this.contasApiUrl}/${contaId}/cartoes/${cartaoId}`;
    return this.http.post(url, null, { responseType: 'text' });
  }

  quitarParcela(id: number, valorParcela: number): Observable<string> {
    const url = `${this.apiUrl}/${id}/quitar-parcela?valorParcela=${valorParcela}`;
    return this.http.post(url, null, { responseType: 'text' });
  }
}