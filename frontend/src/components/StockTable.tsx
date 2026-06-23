import type { Item } from "../types/Item";
import { StockTableRow } from "./StockTableRow";

interface StockTableProps {
  items: Item[];
  onEdit: (item: Item) => void;
}

export function StockTable({ items, onEdit }: StockTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
            <th className="p-4 font-semibold">Produto</th>
            <th className="p-4 font-semibold">Qtd.</th>
            <th className="p-4 font-semibold">Preço Unitário</th>
            <th className="p-4 font-semibold">Tipo</th>
            <th className="p-4 font-semibold text-right">Status</th>
            <th className="p-4 font-semibold text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-8 text-center text-slate-500">
                Nenhum item no estoque.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <StockTableRow key={item.id} item={item} onEdit={onEdit} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
