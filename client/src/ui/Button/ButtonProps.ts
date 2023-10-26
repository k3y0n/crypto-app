import { ReactNode } from "react";

export interface ButtonProps {
  onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
  label?: string | number;
  className?: string;
  children?:  ReactNode,
}
