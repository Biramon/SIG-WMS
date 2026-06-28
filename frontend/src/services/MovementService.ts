import { api } from "./api";
import { StockMovement, MovementType } from "@/types/StockMovement";

export const MovementService = {
  getMovements: async (): Promise<StockMovement[]> => {
    try {
      const response = await api.get<any[]>("/movimentacoes/listar");

      return response.data.map((backItem) => ({
        id: String(backItem.id),
        produto: backItem.product,
        quantidade: backItem.quantidade,
        tipo: backItem.tipoMovimentacao.nome.toLowerCase() as MovementType,
        dataMovimentacao: backItem.createdAt,
        motivo: backItem.observacao,
      }));
    } catch (err) {
      console.error("Erro ao buscar movimentações:", err);
      return [];
    }
  },

  saveMovement: async (movement: StockMovement): Promise<void> => {
    try {
      const payload = {
        quantidade: movement.quantidade,
        observacao: movement.motivo,
        tipoMovimentacao: { nome: movement.tipo.toUpperCase() },
        product: { id: Number(movement.produto.id) },
      };

      console.log(payload);

      await api.post<any>("/movimentacoes/salvar", payload);
    } catch (err) {
      console.error("Erro ao salvar movimentação:", err);
      throw err;
    }
  },
};
