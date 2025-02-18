import { SelectType } from "../../types/select";

export const Select: React.FC<SelectType> = ({ defaultValue, onChange, name, labels, label, values }) => {
  return <div className="form_field">
    <label>{label}</label>
    <select name={name} defaultValue={defaultValue} onChange={(e) => onChange(e.target.value)}>
      {values.map(item =>
        <option key={item} value={item}>
          {labels[item]}
        </option>
      )}
    </select>
  </div>
};
