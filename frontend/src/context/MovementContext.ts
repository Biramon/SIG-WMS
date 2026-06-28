import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { StockMovement } from "../types/StockMovement";
import { MovementService } from "../services/MovementService";

interface MovementContextType {
  movimentacoes: StockMovement[];
  loading: boolean;
  error: string | null;
  refetchMovimentacoes: () => Promise<void>;
  addMovimentacao: (
    novaMovimentacao: Omit<StockMovement, "id">,
  ) => Promise<void>;
}

export const MovementContext = createContext<MovementContextType | undefined>(
  undefined,
);

export const MovementProvider = ({ children }: { children: ReactNode }) => {
  const [movimentacoes, setMovimentacoes] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovimentacoes = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await MovementService.getMovements();
      setMovimentacoes(data);
    } catch {
      setError("Falha ao carregar as movimentações de estoque.");
    } finally {
      setLoading(false);
    }
  };

  const addMovimentacao = async (
    novaMovimentacao: Omit<StockMovement, "id">,
  ) => {
    try {
      setLoading(true);
      setError(null);

      // novaMovimentacao doesn't include an id (server generates it). Cast to
      // StockMovement to satisfy the service signature.
      await MovementService.saveMovement(
        novaMovimentacao as unknown as StockMovement,
      );
      await fetchMovimentacoes();
    } catch {
      setError("Erro ao salvar a movimentação.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  return React.createElement(
    MovementContext.Provider,
    {
      value: {
        movimentacoes,
        loading,
        error,
        refetchMovimentacoes: fetchMovimentacoes,
        addMovimentacao,
      },
    },
    children,
  );
};

export const useMovimentacoes = (): MovementContextType => {
  const context = useContext(MovementContext);
  if (!context) {
    throw new Error(
      "useMovimentacoes deve ser usado dentro de um MovementProvider",
    );
  }
  return context;
};
