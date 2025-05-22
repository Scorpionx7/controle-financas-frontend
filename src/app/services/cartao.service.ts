// src/app/services/cartao.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartaoDeCredito } from '../models/cartao.model'; // Importa a interface CartaoDeCredito

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private apiUrl = 'http://localhost:8080/cartoes'; // URL base da sua API de cartões

  constructor(private http: HttpClient) { }

  /**
   * Busca todos os cartões de crédito do backend.
   * @returns Um Observable que emite um array de CartaoDeCredito.
   */
  getCartoes(): Observable<CartaoDeCredito[]> {
    return this.http.get<CartaoDeCredito[]>(this.apiUrl);
  }

  /**
   * Salva um novo cartão de crédito no backend.
   * @param cartao O objeto CartaoDeCredito a ser salvo.
   * @returns Um Observable que emite o CartaoDeCredito salvo.
   */
  salvarCartao(cartao: CartaoDeCredito): Observable<CartaoDeCredito> {
    // Seu backend tem um endpoint POST /cartoes que recebe um CartaoDeCredito.
    // Se precisar de '/criar', ajuste a URL. Seu controller possui @PostMapping.
    return this.http.post<CartaoDeCredito>(this.apiUrl, cartao);
  }

  /**
   * Vincula um cartão a uma conta.
   * @param contaId ID da conta.
   * @param cartaoId ID do cartão.
   * @returns Um Observable que emite a resposta da vinculação.
   */
  vincularCartaoAConta(contaId: number, cartaoId: number): Observable<any> {
    // Endpoint: /contas/{contaId}/cartoes/{cartaoId}
    const url = `http://localhost:8080/contas/<span class="math-inline">\{contaId\}/cartoes/</span>{cartaoId}`;
    return this.http.post(url, null); // O corpo da requisição pode ser null para POST sem corpo
  }
}