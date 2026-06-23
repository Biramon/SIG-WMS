import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Item } from "../types/Item";
import { StorageService } from "../services/api";

interface ProductContextType {
  produtos: Item[];
  loading: boolean;
  error: string | null;
  refetchProdutos: () => Promise<void>;
  addProduto: (novoItem: Omit<Item, "id">) => Promise<void>;
  editProduto: (id: string, itemAtualizado: Partial<Item>) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [produtos, setProdutos] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = async () => {
    try {
      setLoading(true);

      const dadosDoArquivo = StorageService.getItems();
      setProdutos(dadosDoArquivo);
    } catch {
      setError("Falha ao ler o arquivo de produtos.");
    } finally {
      setLoading(false);
    }
  };

  const addProduto = async (novoItem: Omit<Item, "id">) => {
    try {
      setLoading(true);
      const dadosAtuais = StorageService.getItems();

      const itemComId: Item = {
        ...novoItem,
        id: crypto.randomUUID(),
      };

      const novaLista = [...dadosAtuais, itemComId];

      StorageService.saveItems(novaLista);

      setProdutos(novaLista);
    } catch {
      setError("Erro ao salvar o produto no arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const editProduto = async (id: string, itemAtualizado: Partial<Item>) => {
    try {
      setLoading(true);
      const dadosAtuais = StorageService.getItems();

      const novaLista = dadosAtuais.map((item) =>
        item.id === id ? { ...item, ...itemAtualizado } : item,
      );

      StorageService.saveItems(novaLista);
      setProdutos(novaLista);
    } catch {
      setError("Erro ao editar o arquivo de produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return React.createElement(
    ProductContext.Provider,
    {
      value: {
        produtos,
        loading,
        error,
        refetchProdutos: fetchProdutos,
        addProduto,
        editProduto,
      },
    },
    children,
  );
};

export const useProdutos = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProdutos deve ser usado dentro de um ProdutosProvider");
  return context;
};
