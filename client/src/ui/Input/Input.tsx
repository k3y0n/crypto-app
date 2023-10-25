import React from "react";
import { InputProps } from "./InputProps";
import styles from "./Input.module.css";

const Input: React.FC<InputProps> = ({ type, placeholder,searchChange }) => {
  return (
    <div className={styles["input-wrapper"]}>
      <input
        className={styles["input-field"]}
        type={type}
        placeholder={placeholder}
        onChange={searchChange}
      />
    </div>
  );
};

export default Input;
