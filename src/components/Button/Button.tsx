import styles from "./Button.module.scss";
import { ButtonProps } from "./ButtonProps";

const Button = ({
  label,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) => (
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
