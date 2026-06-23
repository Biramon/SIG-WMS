import { useState } from "react";
import type { ProductType } from "../types/ProductType";
import ProductTypesForm from "../components/ProductTypesForm";
import { ProductTypesHeader } from "../components/ProductTypesHeader";
import { ProductTypesTable } from "../components/ProductTypesTable";
import { useProductTypes } from "../context/ProductTypesContext";

export default function ProductTypes() {
  const [editingType, setEditingType] = useState<ProductType | null>(null);

  const { productTypes, loading, error, addProductType, editProductType } =
    useProductTypes();

  const handleFormSubmit = async (formData: Omit<ProductType, "id">) => {
    if (editingType) {
      await editProductType(editingType.id, formData);
      setEditingType(null);
    } else {
      await addProductType({
        ...formData,
      });
    }
  };

  const handleTogglestatus = async (id: string) => {
    const targetType = productTypes.find((type) => type.id === id);
    if (targetType) {
      await editProductType(id, { status: !targetType.status });
    }
  };

  if (loading && productTypes.length === 0)
    return <div className="text-center py-10">Carregando categorias...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Erro: {error}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <ProductTypesHeader />

      <ProductTypesForm
        onSubmit={handleFormSubmit}
        editingType={editingType}
        onCancel={() => setEditingType(null)}
      />

      <ProductTypesTable
        types={productTypes}
        onEdit={setEditingType}
        onToggle={handleTogglestatus}
      />
    </div>
  );
}
