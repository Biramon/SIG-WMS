import { MovementProvider } from "@/context/MovementContext";
import { ProductsProvider } from "@/context/ProductContext";
import MovementOut from "@/pages/MovementOut";

export default function MovementOutView() {
  return (
    <ProductsProvider>
      <MovementProvider>
        <MovementOut />
      </MovementProvider>
    </ProductsProvider>
  );
}
