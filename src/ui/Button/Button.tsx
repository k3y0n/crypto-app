import React from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "./ButtonProps";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => (
  <button
    className={`${styles.button} ${styles[className]}`}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
