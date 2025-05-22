// src/app/models/cartao.model.ts
import { Conta } from './conta.model'; // Importa a interface Conta

export interface CartaoDeCredito {
  id?: number;
  nome: string;
  limite: number;
  gastoAtual?: number; // Opcional, o backend pode retornar ou ser 0 ao criar
  conta?: Conta; // Opcional, para associar um cartão a uma conta
}