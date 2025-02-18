import { useMemo } from "react";
import { FilterSelectType } from "../../types/select";
import { TodoStatusEnum } from "../../types/todo";
import { Select } from ".";
import { STATUS_DROPDOWN_LABELS } from "../../constants";

export const StatusSelect: React.FC<FilterSelectType> = ({ defaultValue, onChange, extraOptions = [] }) => {
  const values = useMemo(() => {
    return [
      ...extraOptions,
      ...Object.values(TodoStatusEnum),
    ]
  }, [extraOptions]);

  return <Select
    name="status"
    defaultValue={defaultValue}
    onChange={onChange}
    label="Status"
    values={values}
    labels={STATUS_DROPDOWN_LABELS}
  />
}
