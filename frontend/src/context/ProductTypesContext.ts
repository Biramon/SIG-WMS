import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { ProductType } from "@/types/ProductType";
import { StorageService } from "../services/StorageService";

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

  // 1. Puxa os dados assincronamente da API
  const fetchProductTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const dadosDaAPI = await StorageService.getProductTypes();
      setProductTypes(dadosDaAPI);
    } catch {
      setError("Falha ao ler as categorias do banco.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Adiciona jogando o payload único para a API
  const addProductType = async (novoType: Omit<ProductType, "id">) => {
    try {
      setLoading(true);
      setError(null);

      await StorageService.saveProductTypes(novoType);

      await fetchProductTypes();
    } catch {
      setError("Erro ao salvar categoria no banco.");
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
      setError(null);

      const typeCompletoParaMandar = { id, ...typeAtualizado } as ProductType;

      await StorageService.saveProductTypes(typeCompletoParaMandar);

      setProductTypes((dadosAtuais) =>
        dadosAtuais.map((type) =>
          type.id === id ? { ...type, ...typeAtualizado } : type,
        ),
      );
    } catch {
      setError("Erro ao editar a categoria no banco.");
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
