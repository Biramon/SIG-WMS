import { useState } from "react";
import type { ProductType } from "../types/ProductType";
import ProductTypesForm from "../components/ProductTypesForm";
import { ProductTypesHeader } from "../components/ProductTypesHeader";
import { ProductTypesTable } from "../components/ProductTypesTable";

export default function ProductTypes() {
  const [types, setTypes] = useState<ProductType[]>([
    { id: "1", name: "Eletrodoméstico", active: true },
    { id: "2", name: "Eletrônicos", active: true },
    { id: "3", name: "Vestuário", active: false },
  ]);

  const [editingType, setEditingType] = useState<ProductType | null>(null);

  const handleFormSubmit = (formData: Omit<ProductType, "id">) => {
    if (editingType) {
      setTypes(
        types.map((type) =>
          type.id === editingType.id ? { ...type, ...formData } : type,
        ),
      );
      setEditingType(null);
    } else {
      const newType: ProductType = {
        id: crypto.randomUUID(),
        ...formData,
      };
      setTypes([...types, newType]);
    }
  };

  const handleToggleActive = (id: string) => {
    setTypes(
      types.map((type) =>
        type.id === id ? { ...type, active: !type.active } : type,
      ),
    );
  };

  const handleRemoveType = (id: string) => {
    setTypes(types.filter((type) => type.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <ProductTypesHeader />

      <ProductTypesForm
        onSubmit={handleFormSubmit}
        editingType={editingType}
        onCancel={() => setEditingType(null)}
      />
      <ProductTypesTable
        types={types}
        onEdit={setEditingType}
        onToggle={handleToggleActive}
        onRemove={handleRemoveType}
      />
    </div>
  );
}
