import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Item } from "../types/Item";

const mockItems: Item[] = [
  {
    id: "1",
    name: "Notebook Dell Inspiron",
    quantity: 15,
    price: 4500.0,
    type: "Tipo1",
    active: true,
  },
  {
    id: "2",
    name: 'Monitor LG 27"',
    quantity: 8,
    price: 1200.0,
    type: "Tipo1",
    active: true,
  },
  {
    id: "3",
    name: "Teclado Mecânico Keychron",
    quantity: 20,
    price: 650.0,
    type: "Tipo1",
    active: true,
  },
];

interface ProdutosContextType {
  produtos: Item[];
  loading: boolean;
  error: string | null;
  refetchProdutos: () => Promise<void>;
  addProduto: (novoItem: Omit<Item, "id">) => Promise<void>;
  editProduto: (id: string, itemAtualizado: Partial<Item>) => Promise<void>;
}

export const ProdutosContext = createContext<ProdutosContextType | undefined>(
  undefined,
);

export const ProdutosProvider = ({ children }: { children: ReactNode }) => {
  const [produtos, setProdutos] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simula GET
  const fetchProdutosSimulado = async () => {
    try {
      setLoading(true);
      //await new Promise((resolve) => setTimeout(resolve, 500));
      setProdutos((prev) => (prev.length === 0 ? mockItems : prev));
    } catch {
      setError("Falha ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  // Simula POST
  const addProduto = async (novoItem: Omit<Item, "id">) => {
    try {
      setLoading(true);
      //await new Promise((resolve) => setTimeout(resolve, 600));

      const itemComId: Item = {
        ...novoItem,
        id: crypto.randomUUID(),
      };

      setProdutos((produtosAtuais) => [...produtosAtuais, itemComId]);
    } catch {
      setError("Erro ao adicionar produto.");
    } finally {
      setLoading(false);
    }
  };

  // Simula PUT
  const editProduto = async (id: string, itemAtualizado: Partial<Item>) => {
    try {
      setLoading(true);
      //await new Promise((resolve) => setTimeout(resolve, 600));

      setProdutos((produtosAtuais) =>
        produtosAtuais.map((item) =>
          item.id === id ? { ...item, ...itemAtualizado } : item,
        ),
      );
    } catch {
      setError("Erro ao editar produto.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutosSimulado();
  }, []);

  return React.createElement(
    ProdutosContext.Provider,
    {
      value: {
        produtos,
        loading,
        error,
        refetchProdutos: fetchProdutosSimulado,
        addProduto,
        editProduto,
      },
    },
    children,
  );
};

export const useProdutos = (): ProdutosContextType => {
  const context = useContext(ProdutosContext);
  if (!context)
    throw new Error("useProdutos deve ser usado dentro de um ProdutosProvider");
  return context;
};
