import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { ProductType } from "../types/ProductType";

var mockProductTypes: ProductType[] = [
  { id: "1", name: "Eletrodoméstico", active: true },
  { id: "2", name: "Eletrônicos", active: true },
  { id: "3", name: "Vestuário", active: false },
];

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

  // Simula GET
  const fetchProductTypesSimulado = async () => {
    try {
      setLoading(true);
      setProductTypes((prev) => (prev.length === 0 ? mockProductTypes : prev));
    } catch {
      setError("Falha ao carregar tipos de produto.");
    } finally {
      setLoading(false);
    }
  };

  // Simula POST
  const addProductType = async (novoType: Omit<ProductType, "id">) => {
    try {
      setLoading(true);

      const typeComId: ProductType = {
        ...novoType,
        id: crypto.randomUUID(), //ID aleatorio
      };

      setProductTypes((typesAtuais) => [...typesAtuais, typeComId]);
    } catch {
      setError("Erro ao adicionar tipo de produto.");
    } finally {
      setLoading(false);
    }
  };

  // Simula PUT
  const editProductType = async (
    id: string,
    typeAtualizado: Partial<ProductType>,
  ) => {
    try {
      setLoading(true);

      setProductTypes((typesAtuais) =>
        typesAtuais.map((type) =>
          type.id === id ? { ...type, ...typeAtualizado } : type,
        ),
      );
    } catch {
      setError("Erro ao editar tipo de produto.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductTypesSimulado();
  }, []);

  return React.createElement(
    ProductTypesContext.Provider,
    {
      value: {
        productTypes,
        loading,
        error,
        refetchProductTypes: fetchProductTypesSimulado,
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
