import { useState, useEffect } from "react";
import type { Item } from "../types/Item";

interface StockFormProps {
  onSubmit: (itemData: Omit<Item, "id">) => void;
  editingItem: Item | null;
  onCancel: () => void;
}

const TYPES = ["Tipo1", "Tipo2"];

export default function StockForm({
  onSubmit,
  editingItem,
  onCancel,
}: StockFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setQuantity(editingItem.quantity);
      setPrice(editingItem.price);
      setType(editingItem.type);
    } else {
      setName("");
      setQuantity("");
      setPrice("");
      setType("");
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || quantity === "" || price === "") return;

    onSubmit({
      name,
      quantity: Number(quantity),
      price: Number(price),
      type: type,
      active: true,
    });

    if (!editingItem) {
      setName("");
      setQuantity("");
      setPrice("");
      setType("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">
        {editingItem ? "Editar Item" : "Novo Item"}
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nome do Produto
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Teclado Mecânico..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-40">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Tipo do Produto
          </label>
          <select
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Selecione...
            </option>
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="w-32">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Quantidade
          </label>
          <input
            type="number"
            min="0"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
        <div className="w-40">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Preço (R$)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>

        <button
          type="submit"
          className={`px-6 py-2 text-white font-medium rounded-lg transition-colors ${
            editingItem
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingItem ? "Atualizar" : "Adicionar"}
        </button>

        {editingItem && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}
