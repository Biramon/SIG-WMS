import { useState } from "react";
import type { Item } from "../types/Item";
import { StockHeader } from "../components/StockHeader";
import StockForm from "../components/StockForm";
import { StockTable } from "../components/StockTable";
import { useProdutos } from "@/context/ProductContext";

export default function Stock() {
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const { produtos, loading, error, addProduto, editProduto } = useProdutos();

  const handleSubmitForm = async (itemData: Omit<Item, "id">) => {
    if (editingItem) {
      await editProduto(editingItem.id, {
        ...itemData,
      });
      setEditingItem(null);
    } else {
      await addProduto({
        ...itemData,
      });
    }
  };

  if (loading && produtos.length === 0)
    return <div className="text-center py-10">Carregando estoque...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Erro: {error}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <StockHeader />

      <StockForm
        onSubmit={handleSubmitForm}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      <StockTable items={produtos} onEdit={(item) => setEditingItem(item)} />
    </div>
  );
}
