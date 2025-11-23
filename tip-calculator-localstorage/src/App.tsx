import { useOrder } from "./hooks/useOrder";
import { menuItems } from "./data/db";
import { MenuItem } from "./components/MenuItem";
import { OrderContent } from "./components/OrderContent";
import { TipForm } from "./components/TipForm";
import { OrderTotal } from "./components/OrderTotal";

function App() {
  const { order, tip, setTip, addItem, removeItem, placeOrder } = useOrder();

  return (
    <>
      <header className="bg-blue-400 py-5">
        <h1 className="text-center text-3xl font-semibold text-white">
          Calculadora de propinas y consumo
        </h1>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-20 gap-5 grid md:grid-cols-2 md:gap-2">
        <div>
          <h2 className="text-xl font-black uppercase">Menú</h2>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>

        <div className="shadow-md rounded-lg px-2 space-y-5">
          {order.length ? (
            <>
              <OrderContent order={order} removeItem={removeItem} />

              <TipForm tip={tip} setTip={setTip} />

              <OrderTotal order={order} tip={tip} placeOrder={placeOrder} />
            </>
          ) : (
            <p className="text-center py-2">La orden esta vacía.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
