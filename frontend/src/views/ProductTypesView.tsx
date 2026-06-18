import { ProductTypesProvider } from "../context/ProductTypesContext";
import ProductTypesPage from "../pages/ProductTypes";

export default function ProductTypesView() {
  return (
    <ProductTypesProvider>
      <ProductTypesPage />
    </ProductTypesProvider>
  );
}
