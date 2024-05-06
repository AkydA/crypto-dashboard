import React from "react";

interface PriceNumberProps {
  num: number;
  currency: "krw" | "usd";
  useUnit?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const UNIT = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "K" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "B" },
  { value: 1e12, symbol: "T" },
];

export const PriceNumber: React.FC<PriceNumberProps> = ({
  num,
  currency,
  useUnit = false,
  className,
  style,
}) => {
  const getPriceNumber = (price?: number): string => {
    if (price) {
      let i = 0;
      if (useUnit) {
        for (i = UNIT.length - 1; i > 0; i--) {
          if (price >= UNIT[i].value) {
            break;
          }
        }
        price /= UNIT[i].value;
      }

      return `${currency === "krw" ? "₩" : "$"}${price.toLocaleString("en", {
        maximumFractionDigits: 2,
      })}${UNIT[i].symbol}`;
    }
    return "-";
  };

  return (
    <div className={className} style={style}>
      {getPriceNumber(num)}
    </div>
  );
};
