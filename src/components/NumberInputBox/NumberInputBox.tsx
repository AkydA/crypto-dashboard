import clsx from "clsx";
import React from "react";

import S from "./NumberInputBox.module.scss";

interface INumberInputBoxProps {
  className?: string;
  enable: boolean;
  value: string;
  updateValue: (value: string) => void;
  accuracy: number;
  onFocus?: () => void;
}

export const NumberInputBox: React.FC<INumberInputBoxProps> = ({
  className,
  enable,
  value,
  accuracy,
  updateValue,
  onFocus = null,
}) => {
  const getNumber = (numString: string) => {
    return Number(numString.replaceAll(",", ""));
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (enable) {
      // handle input '.'
      let lastDot = false;
      let fractionEndZero = false;
      if (e.target.value.endsWith(".")) lastDot = true;
      if (e.target.value.includes(".") && e.target.value.endsWith("0"))
        fractionEndZero = true;

      const amount = getNumber(e.target.value);

      // handle input NaN, '+', '-', 'e'
      if (e.target.value === "" || e.target.value.includes("-")) {
        updateValue("");
        return;
      }

      const fractionDigits =
        e.target.value.length - 1 - e.target.value.indexOf(".");
      if (
        isNaN(amount) ||
        (e.target.value.includes(".") && fractionDigits > accuracy)
      )
        return;

      updateValue(
        `${amount.toLocaleString("en", {
          maximumFractionDigits: accuracy,
          minimumFractionDigits: fractionEndZero ? fractionDigits : 0,
        })}${lastDot ? "." : ""}`
      );
    }
  };

  return (
    <input
      className={clsx(S["number-input-box"], className)}
      onFocus={onFocus !== null ? onFocus : undefined}
      onChange={onChangeAmount}
      min={0}
      placeholder={(10 ** -(accuracy + 1))
        .toFixed(accuracy + 1)
        .substring(0, accuracy + 2)}
      value={value}
      onDrop={(e) => {
        e.preventDefault();
      }}
    />
  );
};
