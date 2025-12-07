import axios from "axios";
import { CryptoCurrenciesResponse, CryptoPrice } from "../schemas";
import type { PairCurrencyType } from "../types";

export async function getCryptos() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";

  const {
    data: { Data },
  } = await axios.get(url);

  const res = CryptoCurrenciesResponse.safeParse(Data);

  if (res.success) {
    return res.data;
  }
}

export async function getCryptoData(pair: PairCurrencyType) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptoCurrency}&tsyms=${pair.currency}`;

  const {
    data: { DISPLAY },
  } = await axios.get(url);

  const res = CryptoPrice.safeParse(
    DISPLAY[pair.cryptoCurrency][pair.currency]
  );

  if (res.success) {
    return res.data;
  }
}
