import { useState, useEffect } from "react";
import type { Item } from "../types/Item";
import { useProductTypes } from "../context/ProductTypesContext";

interface StockFormProps {
  onSubmit: (itemData: Omit<Item, "id">) => void;
  editingItem: Item | null;
  onCancel: () => void;
}

export default function StockForm({
  onSubmit,
  editingItem,
  onCancel,
}: StockFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState<boolean>(false);

  const { productTypes, loading } = useProductTypes();

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setQuantity(editingItem.quantity);
      setPrice(editingItem.price);
      setType(editingItem.type);
      setStatus(editingItem.status);
    } else {
      setName("");
      setQuantity("");
      setPrice("");
      setType("");
      setStatus(true);
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === "") return;

    onSubmit({
      name,
      quantity: Number(quantity),
      price: Number(price),
      type: type,
      status: status,
    });

    if (!editingItem) {
      setName("");
      setQuantity("");
      setPrice("");
      setType("");
      setStatus(true);
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
            disabled={loading}
            className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              {loading ? "Carregando..." : "Selecione..."}
            </option>

            {!loading &&
              productTypes
                .filter((productType) => productType.status === true)
                .map((productType) => (
                  <option key={productType.id} value={productType.name}>
                    {productType.name}
                  </option>
                ))}
          </select>
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

        <div className="w-32">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-slate-900">
              {status ? "Ativo" : "Desativado"}
            </span>
          </label>
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
