import { create } from "zustand";
import { getCryptos, getCryptoData } from "../services/CryptoService";
import type {
  CryptoCurrency,
  PairCurrencyType,
  CryptoInfoType,
} from "../types";

const initialResultState = {
  IMAGEURL: "",
  PRICE: "",
  HIGHDAY: "",
  LOWDAY: "",
  CHANGEPCT24HOUR: "",
  LASTUPDATE: "",
};

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  priceInfo: CryptoInfoType;
  isLoading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchCryptoData: (pair: PairCurrencyType) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>((set) => ({
  cryptoCurrencies: [],
  priceInfo: initialResultState,
  isLoading: false,
  fetchCryptos: async () => {
    set({ isLoading: true });
    const cryptoCurrencies = await getCryptos();
    set({ cryptoCurrencies, isLoading: false });
  },
  fetchCryptoData: async (pair) => {
    set({ isLoading: true });
    const priceInfo = await getCryptoData(pair);
    set({ priceInfo, isLoading: false });
  },
}));
