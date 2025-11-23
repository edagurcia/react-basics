export type MenuItem = {
  id: number;
  name: string;
  price: number;
};

export type TipOption = {
  id: string;
  value: number;
  label: string;
};

export type OrderItem = MenuItem & {
  quantity: number;
};
