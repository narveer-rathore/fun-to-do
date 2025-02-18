import { useMemo } from "react";
import { FilterSelectType } from "../../types/select";
import { TodoPriorityEnum } from "../../types/todo";
import { Select } from ".";
import { PRIORITY_DROPDOWN_LABELS } from "../../constants";

export const PrioritySelect: React.FC<FilterSelectType> = ({ defaultValue, onChange, extraOptions = [] }) => {
  const values = useMemo(() => {
    return [
      ...extraOptions,
      ...Object.values(TodoPriorityEnum),
    ]
  }, [extraOptions]);

  return <Select
    name="priority"
    defaultValue={defaultValue}
    onChange={onChange}
    label="Priority"
    values={values}
    labels={PRIORITY_DROPDOWN_LABELS}
  />
};
