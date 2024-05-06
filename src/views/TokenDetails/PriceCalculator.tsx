import React, { useMemo, useState } from "react";

import SwapHorizontal from "~/assets/swapHorizontal.svg?react";
import SwapVertical from "~/assets/swapVertical.svg?react";
import { NumberInputBox } from "~/components/NumberInputBox";
import { useMediaQuery } from "~/hooks/useMediaQuery";

import S from "./PriceCalculator.module.scss";

interface PriceCalculatorProps {
  symbol: string;
  price: number;
  currency: "krw" | "usd";
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  symbol,
  price,
  currency,
}) => {
  const isMobile = useMediaQuery("(max-width: 720px)");
  const [tokenValue, setTokenValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("");
  const [inputToken, setInputToken] = useState(true);

  useMemo(() => {
    if (inputToken) {
      const num = Number(tokenValue.replaceAll(",", ""));
      setCurrencyValue(
        (num * price).toLocaleString("en", { maximumFractionDigits: 0 })
      );
    } else {
      const num = Number(currencyValue.replaceAll(",", ""));
      setTokenValue(
        (num / price).toLocaleString("en", { maximumFractionDigits: 8 })
      );
    }
  }, [inputToken, tokenValue, currencyValue, price]);

  return (
    <div className={S["price-calculator"]}>
      <div className={S.title}>가격 계산</div>
      <div className={S["swap-wrapper"]}>
        <div className={S["input-wrapper"]}>
          <div className={S["input-title"]}>{symbol.toUpperCase()}</div>
          <NumberInputBox
            className={S.field}
            accuracy={8}
            value={tokenValue}
            updateValue={setTokenValue}
            enable={inputToken}
            onFocus={() => {
              if (!inputToken) {
                setInputToken(true);
              }
            }}
          />
        </div>
        {isMobile ? (
          <SwapVertical className={S["swap-icon"]} />
        ) : (
          <SwapHorizontal className={S["swap-icon"]} />
        )}
        <div className={S["input-wrapper"]}>
          <div className={S["input-title"]}>{currency.toUpperCase()}</div>
          <NumberInputBox
            className={S.field}
            accuracy={0}
            value={currencyValue}
            updateValue={setCurrencyValue}
            enable={!inputToken}
            onFocus={() => {
              if (inputToken) {
                setInputToken(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
