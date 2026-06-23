import { StockMovement } from "@/types/StockMovement";

const STORAGE_KEY = "mock_stock_movements";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MovementService = {
  getMovements: async (): Promise<StockMovement[]> => {
    await delay(500);

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        const mockInicial: StockMovement[] = [
          {
            id: "1",
            produtoId: "1",
            quantidade: 50,
            tipo: "entrada",
            motivo: "Estoque inicial",
            dataMovimentacao: new Date().toISOString(),
          },
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockInicial));
        return mockInicial;
      }

      return JSON.parse(data) as StockMovement[];
    } catch (err) {
      console.error("Erro ao ler movimentações do localStorage:", err);
      return [];
    }
  },

  saveMovement: async (
    movement: Omit<StockMovement, "id"> | StockMovement,
  ): Promise<StockMovement | undefined> => {
    await delay(600);

    try {
      const currentMovements = await MovementService.getMovements();

      let savedMovement: StockMovement;

      if ("id" in movement && movement.id) {
        savedMovement = movement as StockMovement;
        const index = currentMovements.findIndex((m) => m.id === movement.id);

        if (index >= 0) {
          currentMovements[index] = savedMovement;
        } else {
          currentMovements.push(savedMovement);
        }
      } else {
        savedMovement = {
          ...movement,
          id: Date.now().toString(),
        } as StockMovement;
        currentMovements.push(savedMovement);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentMovements));
      return savedMovement;
    } catch (err) {
      console.error("Erro ao salvar movimentação no localStorage:", err);
      throw err;
    }
  },
};
