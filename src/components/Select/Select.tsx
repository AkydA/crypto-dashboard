import React, { PropsWithChildren } from "react";

import S from "./Select.module.scss";

interface SelectProps extends PropsWithChildren {
  value: string;
  setValue: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  value,
  setValue,
  children,
}) => {
  return (
    <select
      title={value}
      className={S["custom-select"]}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {children}
    </select>
  );
};
