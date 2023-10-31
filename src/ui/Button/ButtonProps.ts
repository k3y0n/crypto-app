export interface ButtonProps {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string | number;
  className?: string;
  type?: "submit" | "reset" | "button";
}
