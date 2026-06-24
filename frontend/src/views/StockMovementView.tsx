import StockMovement from "@/pages/StockMovement";
import { MovementProvider } from "../context/MovementContext";

export default function StockMovementView() {
  return (
    <MovementProvider>
      <StockMovement />
    </MovementProvider>
  );
}
