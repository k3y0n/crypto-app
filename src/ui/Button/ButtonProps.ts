import { ReactNode } from "react";

export interface ButtonProps {
  enabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string | number;
  className?: string;
  children?: ReactNode;
  type?: "submit" | "reset" | "button";
}
