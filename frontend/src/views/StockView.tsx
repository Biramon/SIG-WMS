import { ProductsProvider } from "../context/ProductContext";
import { ProductTypesProvider } from "../context/ProductTypesContext";
import StockPage from "../pages/Stock";

export default function StockView() {
  return (
    <ProductTypesProvider>
      <ProductsProvider>
        <StockPage />
      </ProductsProvider>
    </ProductTypesProvider>
  );
}
