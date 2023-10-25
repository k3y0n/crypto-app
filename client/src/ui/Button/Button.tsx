import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./ButtonProps";

const Button: React.FC<ButtonProps> = ({ label, onClick, className,children }) => {
  return (
    <button
      className={`${styles.button} ${styles[className || ""]}`}
      onClick={onClick}
    >
      {children ? children : label}
    </button>
  );
};

export default Button;
