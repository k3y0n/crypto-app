import { ChangeEvent } from "react";

export interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  searchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
