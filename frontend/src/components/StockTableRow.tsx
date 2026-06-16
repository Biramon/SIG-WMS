import type { Item } from "../types/Item";
import { StockBadge } from "./StockBadge";

interface StockTableRowProps {
  item: Item;
  onEdit: (item: Item) => void;
  onToggle: (id: string) => void;
}

export function StockTableRow({ item, onEdit, onToggle }: StockTableRowProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(item.price);

  return (
    <tr
      className={`hover:bg-slate-50 transition-colors ${item.active ? "" : "opacity-30"}`}
    >
      <td className="p-4 font-medium text-slate-800">{item.name}</td>
      <td className="p-4 text-slate-600">
        <StockBadge quantity={item.quantity} />
      </td>
      <td className="p-4 text-slate-600">{formattedPrice}</td>
      <td className="p-4 text-slate-600">{item.type}</td>
      <td className="p-4 text-right space-x-2">
        <button
          onClick={() => onEdit(item)}
          className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1"
        >
          Editar
        </button>
      </td>
      <td className="p-4 text-right space-x-2">
        <button
          onClick={() => onToggle(item.id)}
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
            item.active
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {item.active ? "Ativo" : "Inativo"}
        </button>
      </td>
    </tr>
  );
}
