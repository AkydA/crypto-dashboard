import { Select as SelectButton } from "./Select";
import { SelectOption } from "./SelectOption";

type SelectComponent = typeof SelectButton & {
  Option: typeof SelectOption;
};

export const Select: SelectComponent = Object.assign(SelectButton, {
  Option: SelectOption,
});
