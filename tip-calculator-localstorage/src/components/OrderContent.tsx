import type { MenuItem, OrderItem } from "../types";
import { formatCurrency } from "../helpers";

interface OrderContentProps {
  order: OrderItem[];
  removeItem: (id: MenuItem["id"]) => void;
}

export const OrderContent = ({ order, removeItem }: OrderContentProps) => {
  return (
    <div>
      <h2 className="font-black text-xl uppercase">Consumo</h2>

      <div className="space-y-2 mt-5">
        {order.map((orderItem) => (
          <div
            key={orderItem.id}
            className="flex justify-between items-center border-t border-gray-200 p-2 last-of-type:border-b"
          >
            <div>
              <p className="font-semibold tracking-tight">
                {orderItem.name} - {formatCurrency(orderItem.price)}
              </p>
              <p className="text-sm">
                Cantidad: {orderItem.quantity} -{" "}
                {formatCurrency(orderItem.price * orderItem.quantity)}
              </p>
            </div>

            <button
              type="button"
              className="bg-red-500 text-white h-8 w-8 rounded-full font-black"
              onClick={() => removeItem(orderItem.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
