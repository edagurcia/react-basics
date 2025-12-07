import { useEffect } from "react";
import { CryptoSearchForm } from "./components/CryptoSearchForm";
import { CryptoDisplay } from "./components/CryptoDisplay";
import { useCryptoStore } from "./store";

function App() {
  const fetchCryptos = useCryptoStore((state) => state.fetchCryptos);

  useEffect(() => {
    fetchCryptos();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Cryptomonedas</span>
        </h1>

        <div className="content">
          <CryptoSearchForm />
          <CryptoDisplay />
        </div>
      </div>
    </>
  );
}

export default App;
