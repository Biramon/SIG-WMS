import type { ProductType } from "../types/ProductType";

interface ProductTypesTableProps {
  types: ProductType[];
  onEdit: (type: ProductType) => void;
  onToggle: (id: string) => void;
}

export function ProductTypesTable({ types, onEdit }: ProductTypesTableProps) {
  if (types.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
        Nenhum tipo de produto cadastrado.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-semibold">
            <th className="p-4">Nome da Categoria</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {types.map((type) => (
            <tr
              key={type.id}
              className="hover:bg-slate-50/50 transition-colors select-text"
            >
              <td className="p-4 font-medium text-slate-800">{type.name}</td>
              <td className="p-4">
                <button
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-default ${
                    type.status
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {type.status ? "Ativo" : "Inativo"}
                </button>
              </td>
              <td className="p-4 text-right space-x-2">
                <button
                  onClick={() => onEdit(type)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
