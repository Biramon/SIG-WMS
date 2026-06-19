import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { StockMovement } from "../types/StockMovement";
import { StorageService } from "../services/StorageService";

interface StockContextType {
  movimentacoes: StockMovement[];
  loading: boolean;
  error: string | null;
  refetchMovimentacoes: () => Promise<void>;
  registrarEntrada: (
    novaMovimentacao: Omit<StockMovement, "id" | "tipo">,
  ) => Promise<void>;
  registrarSaida: (
    novaMovimentacao: Omit<StockMovement, "id" | "tipo">,
  ) => Promise<void>;
}

export const StockContext = createContext<StockContextType | undefined>(
  undefined,
);

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [movimentacoes, setMovimentacoes] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovimentacoes = async () => {
    try {
      setLoading(true);
      setError(null); // Limpa erros anteriores

      const data = await StorageService.getMovements();
      setMovimentacoes(data);
    } catch {
      setError("Falha ao ler o histórico de movimentações de estoque.");
    } finally {
      setLoading(false);
    }
  };

  const registrarEntrada = async (
    novaMovimentacao: Omit<StockMovement, "id" | "tipo">,
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Força o tipo como "entrada" (Inbound / Input / Credit)
      const dadosCompletos = { ...novaMovimentacao, tipo: "entrada" };
      const movimentacaoCriada =
        await StorageService.saveMovement(dadosCompletos);

      if (movimentacaoCriada) {
        setMovimentacoes((currData) => [...currData, movimentacaoCriada]);
      }
    } catch {
      setError("Erro ao registrar entrada de estoque.");
    } finally {
      setLoading(false);
    }
  };

  const registrarSaida = async (
    novaMovimentacao: Omit<StockMovement, "id" | "tipo">,
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Força o tipo como "saida" (Outbound / Output / Debit)
      const dadosCompletos = { ...novaMovimentacao, tipo: "saida" };
      const movimentacaoCriada =
        await StorageService.saveMovement(dadosCompletos);

      if (movimentacaoCriada) {
        setMovimentacoes((currData) => [...currData, movimentacaoCriada]);
      }
    } catch {
      setError("Erro ao registrar saída de estoque.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  return React.createElement(
    StockContext.Provider,
    {
      value: {
        movimentacoes,
        loading,
        error,
        refetchMovimentacoes: fetchMovimentacoes,
        registrarEntrada,
        registrarSaida,
      },
    },
    children,
  );
};

export const useStock = (): StockContextType => {
  const context = useContext(StockContext);
  if (!context)
    throw new Error("useStock deve ser usado dentro de um StockProvider");
  return context;
};
