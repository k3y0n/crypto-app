import { ReactNode } from "react";

export interface ButtonProps {
  onClick: () => void;
  label?: string | number;
  className?: string;
  children?:  ReactNode,
}
