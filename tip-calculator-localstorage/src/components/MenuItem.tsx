import { formatCurrency } from "../helpers";
import type { MenuItem as MItem } from "../types";

interface MenuItemProps {
  item: MItem;
  addItem: (item: MItem) => void;
}

export const MenuItem = ({ item, addItem }: MenuItemProps) => {
  return (
    <button
      type="button"
      className="border border-blue-400 hover:bg-blue-200 w-full p-2 rounded-b-md flex justify-between"
      onClick={() => addItem(item)}
    >
      <p>{item.name}</p>
      <p className="font-black">{formatCurrency(item.price)}</p>
    </button>
  );
};
