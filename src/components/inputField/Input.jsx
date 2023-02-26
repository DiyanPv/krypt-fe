import { inputclass } from "./InputStyling";
export const Input = ({
  label,
  name,
  value,
  onChangeHandler,
  placeholderValue,
}) => {
  return (
    <label htmlFor={name} className={`items-center flex flex-col`}>
      {label}
      <input
        placeholder={placeholderValue}
        value={value}
        name={name}
        className={inputclass}
        onChange={onChangeHandler}
      />
    </label>
  );
};
