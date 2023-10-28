import { ReactNode } from "react";

export interface ButtonProps {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string | number;
  className?: string;
  children?: ReactNode;
  type?: "submit" | "reset" | "button";
}
