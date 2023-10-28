import React from "react";
import { InputProps } from "./InputProps";
import styles from "./Input.module.scss";

const Input: React.FC<InputProps> = ({ type, placeholder, searchChange }) => {
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
