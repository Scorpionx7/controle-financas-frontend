// src/app/services/conta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa o HttpClient para fazer requisições HTTP
import { Observable } from 'rxjs'; // Importa Observable para lidar com dados assíncronos
import { Conta } from '../models/conta.model'; // Importa a interface Conta que você criou

@Injectable({
  providedIn: 'root' // Isso torna o serviço um singleton e disponível em toda a aplicação
})
export class ContaService {

  private apiUrl = 'http://localhost:8080/contas'; // URL base da sua API de contas no Spring Boot

  constructor(private http: HttpClient) { } // Injeta o HttpClient

  /**
   * Busca todas as contas do backend.
   * @returns Um Observable que emite um array de Contas.
   */
  getContas(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl);
  }

  /**
   * Salva uma nova conta no backend.
   * @param conta O objeto Conta a ser salvo.
   * @returns Um Observable que emite a Conta salva.
   */
  salvarConta(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.apiUrl, conta);
  }

  // Você pode adicionar outros métodos aqui, como atualizar, buscar por ID, etc.
}