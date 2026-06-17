import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { ProductType } from "@/types/ProductType";
import { StorageService } from "../services/api";

interface ProductTypesContextType {
  productTypes: ProductType[];
  loading: boolean;
  error: string | null;
  refetchProductTypes: () => Promise<void>;
  addProductType: (novoType: Omit<ProductType, "id">) => Promise<void>;
  editProductType: (
    id: string,
    typeAtualizado: Partial<ProductType>,
  ) => Promise<void>;
}

export const ProductTypesContext = createContext<
  ProductTypesContextType | undefined
>(undefined);

export const ProductTypesProvider = ({ children }: { children: ReactNode }) => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductTypes = async () => {
    try {
      setLoading(true);
      const dadosDoArquivo = StorageService.getProductTypes();
      setProductTypes(dadosDoArquivo);
    } catch {
      setError("Falha ao ler o arquivo de categorias.");
    } finally {
      setLoading(false);
    }
  };

  const addProductType = async (novoType: Omit<ProductType, "id">) => {
    try {
      setLoading(true);
      const dadosAtuais = StorageService.getProductTypes();

      const typeComId: ProductType = {
        ...novoType,
        id: crypto.randomUUID(),
      };

      const novaLista = [...dadosAtuais, typeComId];
      StorageService.saveProductTypes(novaLista);
      setProductTypes(novaLista);
    } catch {
      setError("Erro ao salvar categoria no arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const editProductType = async (
    id: string,
    typeAtualizado: Partial<ProductType>,
  ) => {
    try {
      setLoading(true);
      const dadosAtuais = StorageService.getProductTypes();

      const novaLista = dadosAtuais.map((type) =>
        type.id === id ? { ...type, ...typeAtualizado } : type,
      );

      StorageService.saveProductTypes(novaLista);
      setProductTypes(novaLista);
    } catch {
      setError("Erro ao editar arquivo de categorias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  return React.createElement(
    ProductTypesContext.Provider,
    {
      value: {
        productTypes,
        loading,
        error,
        refetchProductTypes: fetchProductTypes,
        addProductType,
        editProductType,
      },
    },
    children,
  );
};

export const useProductTypes = (): ProductTypesContextType => {
  const context = useContext(ProductTypesContext);
  if (!context)
    throw new Error(
      "useProductTypes deve ser usado dentro de um ProductTypesProvider",
    );
  return context;
};
