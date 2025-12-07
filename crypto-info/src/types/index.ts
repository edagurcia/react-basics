import { z } from "zod";
import {
  CurrencySchema,
  CryptoCurrencyResponse,
  PairSchema,
  CryptoPrice,
} from "../schemas";

export type Currency = z.infer<typeof CurrencySchema>;
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponse>;
export type PairCurrencyType = z.infer<typeof PairSchema>;
export type CryptoInfoType = z.infer<typeof CryptoPrice>;
