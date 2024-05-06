import React, { PropsWithChildren } from "react";

import S from "./Select.module.scss";

interface SelectOptionProps extends PropsWithChildren {
  value: string;
}

export const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  children,
}) => {
  return (
    <option className={S["custom-option"]} value={value}>
      {children}
    </option>
  );
};
