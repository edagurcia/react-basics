import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCryptoStore } from "../store";
import { ErrorMessage } from "./ErrorMessage";
import type { PairCurrencyType } from "../types";
import { currencies } from "../data";

export const CryptoSearchForm = () => {
  const cryptoCurrencies = useCryptoStore((state) => state.cryptoCurrencies);
  const isLoading = useCryptoStore((state) => state.isLoading);
  const fetchCryptoData = useCryptoStore((state) => state.fetchCryptoData);

  const [pair, setPair] = useState<PairCurrencyType>({
    currency: "",
    cryptoCurrency: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (Object.values(pair).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    fetchCryptoData(pair);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select
          name="currency"
          id="currency"
          onChange={handleChange}
          value={pair.currency}
          disabled={isLoading}
        >
          <option value="">-- Seleccione --</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cryptoCurrency">Crypto:</label>
        <select
          name="cryptoCurrency"
          id="cryptoCurrency"
          onChange={handleChange}
          value={pair.cryptoCurrency}
          disabled={isLoading}
        >
          <option value="">-- Seleccione --</option>
          {cryptoCurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Cotizar" disabled={isLoading} />
    </form>
  );
};
