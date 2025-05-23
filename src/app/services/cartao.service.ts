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

  constructor(private http: HttpClient) { }

  getCartoes(): Observable<CartaoDeCredito[]> {
    return this.http.get<CartaoDeCredito[]>(this.apiUrl);
  }

  getCartaoById(id: number): Observable<CartaoDeCredito> {
    return this.http.get<CartaoDeCredito>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }

  salvarCartao(cartao: CartaoDeCredito): Observable<CartaoDeCredito> {
    return this.http.post<CartaoDeCredito>(this.apiUrl, cartao);
  }

  atualizarCartao(id: number, cartao: CartaoDeCredito): Observable<CartaoDeCredito> {
    return this.http.put<CartaoDeCredito>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`, cartao);
  }

  deletarCartao(id: number): Observable<void> {
    return this.http.delete<void>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }

  vincularCartaoAConta(contaId: number, cartaoId: number): Observable<string> {
  const url = `http://localhost:8080/contas/${contaId}/cartoes/${cartaoId}`;
  return this.http.post(url, null, { responseType: 'text' });
}

  quitarParcela(id: number, valorParcela: number): Observable<string> {
    const url = `<span class="math-inline">\{this\.apiUrl\}/</span>{id}/quitar-parcela?valorParcela=${valorParcela}`;
    return this.http.post(url, null, { responseType: 'text' });
  }

}