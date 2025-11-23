import { useMemo } from "react";
import { formatCurrency } from "../helpers";
import type { OrderItem } from "../types";

interface OrderTotalProps {
  order: OrderItem[];
  tip: number;
  placeOrder: () => void;
}

export const OrderTotal = ({ order, tip, placeOrder }: OrderTotalProps) => {
  const subTotal = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const tipAmount = useMemo(() => subTotal * tip, [tip, order]);

  const totalAmount = useMemo(() => subTotal + tipAmount, [tip, order]);

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Totales y propinas</h2>

        <p>
          Subtotal a pagar:{" "}
          <span className="font-bold">{formatCurrency(subTotal)}</span>
        </p>

        <p>
          Propina:{" "}
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>

        <p>
          Total a pagar:{" "}
          <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
      </div>

      <button
        type="button"
        className="w-full bg-black p-2 text-white rounded-md mt-5 mb-2 uppercase disabled:opacity-40"
        disabled={totalAmount === 0}
        onClick={placeOrder}
      >
        Guardar orden
      </button>
    </>
  );
};
