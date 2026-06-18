import { useState, useEffect } from "react";
import type { ProductType } from "../types/ProductType";

interface ProductTypesFormProps {
  onSubmit: (data: Omit<ProductType, "id">) => void;
  editingType: ProductType | null;
  onCancel: () => void;
}

export default function ProductTypesForm({
  onSubmit,
  editingType,
  onCancel,
}: ProductTypesFormProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    if (editingType) {
      setName(editingType.name);
      setStatus(editingType.status);
    } else {
      setName("");
      setStatus(true);
    }
  }, [editingType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      status: status,
    });
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-end gap-4"
    >
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {editingType ? "Editar Categoria" : "Nova Categoria"}
        </label>
        <input
          type="text"
          placeholder="Ex: Eletrodoméstico, Eletrônicos..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
        />
      </div>

      <div className="w-40">
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

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          {editingType ? "Salvar" : "Adicionar"}
        </button>
        {editingType && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
