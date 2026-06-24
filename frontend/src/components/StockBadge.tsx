interface StockBadgeProps {
  quantity: number;
  unity: string;
}

export function StockBadge({ quantity, unity }: StockBadgeProps) {
  const isLowStock = quantity < 10;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        isLowStock ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
      }`}
    >
      {quantity} {unity}
    </span>
  );
}
