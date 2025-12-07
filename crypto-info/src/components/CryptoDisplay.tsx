import { useMemo } from "react";
import { useCryptoStore } from "../store";
import { Spinner } from "./Spinner";

export const CryptoDisplay = () => {
  const priceInfo = useCryptoStore((state) => state.priceInfo);
  const isLoading = useCryptoStore((state) => state.isLoading);
  const hasResult = useMemo(
    () => !Object.values(priceInfo).includes(""),
    [priceInfo]
  );

  return (
    <div className="result-wrapper">
      {isLoading ? (
        <Spinner />
      ) : (
        hasResult && (
          <>
            <h2>Cotización</h2>

            <div className="result">
              <img
                src={`https://cryptocompare.com${priceInfo.IMAGEURL}`}
                alt="Crypto Coin Image"
              />

              <div>
                <p>
                  El precio es de: <span>{priceInfo.PRICE}</span>
                </p>
                <p>
                  Precio más alto del día: <span>{priceInfo.HIGHDAY}</span>
                </p>
                <p>
                  Precio más bajo del día: <span>{priceInfo.LOWDAY}</span>
                </p>
                <p>
                  Variación últimas 24 horas:{" "}
                  <span>{priceInfo.CHANGEPCT24HOUR}</span>
                </p>
                <p>
                  Última actualización: <span>{priceInfo.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};
