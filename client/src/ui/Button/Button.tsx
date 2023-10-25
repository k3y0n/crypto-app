import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./ButtonProps";

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
