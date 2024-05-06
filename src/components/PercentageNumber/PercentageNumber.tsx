import clsx from "clsx";
import React from "react";

import S from "./PercentageNumber.module.scss";

interface PercentageNumberProps {
  num: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PercentageNumber: React.FC<PercentageNumberProps> = ({
  num,
  className,
  style,
}) => {
  const isRaised = num > 0;

  const getPercentageNumber = (num?: number): string => {
    if (num) {
      return `${num.toFixed(2)}%`;
    }
    return "-";
  };

  return (
    <div
      className={clsx(
        S["percentage-number"],
        {
          [S.up]: isRaised,
          [S.down]: !isRaised,
        },
        className
      )}
      style={style}
    >
      {getPercentageNumber(num)}
    </div>
  );
};
