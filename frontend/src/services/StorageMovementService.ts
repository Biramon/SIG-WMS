import { StockMovement } from "../types/StockMovement";

const STORAGE_KEY = "@app:stock_movements";

// Dados mockados para inicializar o sistema caso o LocalStorage esteja vazio
const mockMovements: StockMovement[] = [
  {
    id: "mov-1",
    produtoId: "prod-1", // Supondo que você tenha um produto com esse ID
    quantidade: 50,
    tipo: "entrada",
    motivo: "Reposição de Estoque",
    dataMovimentacao: "2026-06-15T10:00:00.000Z",
    observacao: "Nota fiscal nº 1542",
  },
  {
    id: "mov-2",
    produtoId: "prod-1",
    quantidade: 5,
    tipo: "saida",
    motivo: "Venda",
    dataMovimentacao: "2026-06-16T14:30:00.000Z",
    observacao: "Pedido #8849",
  },
  {
    id: "mov-3",
    produtoId: "prod-2",
    quantidade: 10,
    tipo: "entrada",
    motivo: "Devolução de Cliente",
    dataMovimentacao: "2026-06-17T09:15:00.000Z",
  },
  {
    id: "mov-4",
    produtoId: "prod-3",
    quantidade: 2,
    tipo: "saida",
    motivo: "Avaria / Perda",
    dataMovimentacao: "2026-06-18T11:00:00.000Z",
    observacao: "Produto quebrou no manuseio",
  },
];

export const StorageService = {
  /**
   * Busca todas as movimentações do LocalStorage.
   * Se estiver vazio, popula com os mocks iniciais.
   */
  getItems: async (): Promise<StockMovement[]> => {
    // Simulando um delay de API de 500ms
    await new Promise((resolve) => setTimeout(resolve, 500));

    const storageData = localStorage.getItem(STORAGE_KEY);

    if (!storageData) {
      // Se não houver dados, salva os mocks e os retorna
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockMovements));
      return mockMovements;
    }

    return JSON.parse(storageData) as StockMovement[];
  },

  /**
   * Salva uma nova movimentação no LocalStorage (Entrada ou Saída)
   */
  saveItem: async (
    novaMovimentacao: Omit<StockMovement, "id">,
  ): Promise<StockMovement> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const currentMovements = await StorageService.getItems();

    // Cria o objeto completo simulando o comportamento de um banco de dados (gerando ID e Data)
    const itemCompleto: StockMovement = {
      ...novaMovimentacao,
      id: `mov-${Date.now()}`, // Gera um ID único baseado no timestamp
      dataMovimentacao:
        novaMovimentacao.dataMovimentacao || new Date().toISOString(),
    };

    const updatedMovements = [...currentMovements, itemCompleto];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMovements));

    return itemCompleto;
  },
};
