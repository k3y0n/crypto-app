import { SortSettings } from "../../types/sort";

export interface TableHeaderProps {
  headers: { key: string; label: string }[];
  handleSort: (column: string) => void;
  sortSettings: SortSettings;
}
