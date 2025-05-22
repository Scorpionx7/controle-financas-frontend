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

  salvarCartao(cartao: CartaoDeCredito): Observable<CartaoDeCredito> {
    return this.http.post<CartaoDeCredito>(this.apiUrl, cartao);
  }

  vincularCartaoAConta(contaId: number, cartaoId: number): Observable<string> {
  const url = `http://localhost:8080/contas/${contaId}/cartoes/${cartaoId}`;
  return this.http.post(url, null, { responseType: 'text' });
}

}