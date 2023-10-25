export interface TableHeaderProps {
  headers: { key: string; label: string }[];
  onSort: (key: string) => void;
}
