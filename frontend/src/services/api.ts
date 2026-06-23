import { Item } from "@/types/Item";
import { ProductType } from "@/types/ProductType";

// Mocks iniciais
const initialItems: Item[] = [
  {
    id: "1",
    name: "Notebook Dell Inspiron",
    quantity: 15,
    price: 4500.0,
    type: "Eletrônicos",
    status: true,
  },
  {
    id: "2",
    name: 'Monitor LG 27"',
    quantity: 8,
    price: 1200.0,
    type: "Eletrônicos",
    status: true,
  },
  {
    id: "3",
    name: "Teclado Mecânico Keychron",
    quantity: 20,
    price: 650.0,
    type: "Eletrônicos",
    status: true,
  },
];

const initialProductTypes: ProductType[] = [
  { id: "1", name: "Eletrodoméstico", status: true },
  { id: "2", name: "Eletrônicos", status: true },
  { id: "3", name: "Vestuário", status: false },
];

// Chaves no LocalStorage
const ITEMS_KEY = "@app:items";
const TYPES_KEY = "@app:product_types";

export const StorageService = {
  // --- MÉTODOS PARA PRODUTOS (ITEMS) ---
  getItems: (): Item[] => {
    const data = localStorage.getItem(ITEMS_KEY);
    if (!data) {
      localStorage.setItem(ITEMS_KEY, JSON.stringify(initialItems));
      return initialItems;
    }
    return JSON.parse(data);
  },

  saveItems: (items: Item[]): void => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  },

  // --- MÉTODOS PARA TIPOS DE PRODUTOS ---
  getProductTypes: (): ProductType[] => {
    const data = localStorage.getItem(TYPES_KEY);
    if (!data) {
      localStorage.setItem(TYPES_KEY, JSON.stringify(initialProductTypes));
      return initialProductTypes;
    }
    return JSON.parse(data);
  },

  saveProductTypes: (types: ProductType[]): void => {
    localStorage.setItem(TYPES_KEY, JSON.stringify(types));
  },
};
