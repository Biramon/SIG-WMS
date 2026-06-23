import { MovementProvider } from "@/context/MovementContext";
import { ProductsProvider } from "@/context/ProductContext";
import MovementIn from "@/pages/MovementIn";

export default function MovementInView() {
  return (
    <ProductsProvider>
      <MovementProvider>
        <MovementIn />
      </MovementProvider>
    </ProductsProvider>
  );
}
