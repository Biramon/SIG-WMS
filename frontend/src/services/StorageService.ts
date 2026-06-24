import { api } from "./api";
import { Item } from "@/types/Item";
import { ProductType } from "@/types/ProductType";

export const StorageService = {
  // --- MÉTODOS PARA PRODUTOS ---

  getItems: async (): Promise<Item[]> => {
    const response = await api.get<any[]>("/products/listar");

    return response.data.map((backItem) => ({
      id: String(backItem.id),
      name: backItem.nome || "",
      unity: backItem.unidadeMedida?.nome || "UNIDADE",
      description: backItem.descricao || "",
      quantity: backItem.saldo || 0,
      price: backItem.preco || 0,
      type: backItem.tipoProduto?.denominacao || "",
      status: backItem.ativo ?? true,
    }));
  },

  saveItem: async (
    item: Omit<Item, "id"> | Item,
  ): Promise<Item | undefined> => {
    const localTypes = await StorageService.getProductTypes();
    const selectedType = localTypes.find((t) => t.name === item.type);

    const formattedPayload = {
      id: "id" in item ? Number(item.id) : null,
      nome: item.name,
      descricao: item.description,
      unidadeMedida: { nome: item.unity },
      tipoProduto: {
        id: selectedType ? Number(selectedType.id) : 1,
        denominacao: item.type,
      },
      preco: item.price,
      saldo: item.quantity,
      ativo: item.status,
    };

    try {
      const response = await api.post<any>(
        "/products/salvar",
        formattedPayload,
      );

      if (!response.data) return undefined;

      return {
        ...(item as Item),
        id: "id" in item ? String(item.id) : String(response.data.id),
      };
    } catch (err) {
      console.error("Erro ao salvar item na API:", err);
      throw err;
    }
  },

  // --- MÉTODOS PARA TIPOS DE PRODUTOS ---

  getProductTypes: async (): Promise<ProductType[]> => {
    try {
      const response = await api.get<any[]>("/tipos-produto/listar");

      return response.data.map((backType) => ({
        id: String(backType.id),
        name: backType.denominacao,
        status: backType.ativo ?? true,
      }));
    } catch (err) {
      console.error("Erro ao buscar tipos de produto da API:", err);
      return [];
    }
  },

  saveProductTypes: async (
    type: Omit<ProductType, "id"> | ProductType,
  ): Promise<void> => {
    const formattedPayload = {
      id: "id" in type ? Number(type.id) : null,
      denominacao: type.name,
      ativo: type.status,
    };

    try {
      await api.post("/tipos-produto/salvar", formattedPayload);
    } catch (err) {
      console.error("Erro ao salvar tipo de produto na API:", err);
      throw err;
    }
  },
};
