import { useState } from "react";
import type { Item } from "../types/Item";
import { StockHeader } from "../components/StockHeader";
import StockForm from "../components/StockForm";
import { StockTable } from "../components/StockTable";

interface StockProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function Stock({ items, setItems }: StockProps) {
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleSubmitForm = (itemData: Omit<Item, "id">) => {
    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? { ...itemData, id: editingItem.id }
            : item,
        ),
      );
      setEditingItem(null);
    } else {
      const newItem: Item = {
        ...itemData,
        id: crypto.randomUUID(),
      };
      setItems([...items, newItem]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este item?")) {
      setItems(items.filter((item) => item.id !== id));

      if (editingItem?.id === id) {
        setEditingItem(null);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <StockHeader />

      <StockForm
        onSubmit={handleSubmitForm}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      <StockTable
        items={items}
        onEdit={(item) => setEditingItem(item)}
        onDelete={handleDelete}
      />
    </div>
  );
}
