import { Item } from "./Item";

export type MovementType = "entrada" | "saida";

export interface StockMovement {
  id: string;
  produto: Item; // Relacionamento com o Item/Produto
  quantidade: number; // Quantidade movimentada (sempre positiva)
  tipo: MovementType; // Define o fluxo (entrada ou saída)
  motivo?: string; // Ex: "Venda", "Reposição", "Perda", "Ajuste de Inventário"
  dataMovimentacao: string; // ISO String (ex: 2026-06-18T22:30:00.000Z)
  observacao?: string; // Detalhes extras opcionais
}
