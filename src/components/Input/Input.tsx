import { InputProps } from "./InputProps";
import styles from "./Input.module.scss";

const Input = ({ type, placeholder, searchChange }: InputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={searchChange}
    />
  );
};

export default Input;
