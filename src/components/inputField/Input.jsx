import { inputclass } from "./InputStyling";
export const Input = ({ label, name, value, onChangeHandler }) => {
  return (
    <label htmlFor={name} className={`items-center flex flex-col`}>
      {label}
      <input
        value={value}
        name={name}
        className={inputclass}
        onChange={onChangeHandler}
      />
    </label>
  );
};
