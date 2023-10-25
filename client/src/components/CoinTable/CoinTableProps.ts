import Coin from "../../types/coin";
import { SortSettings } from "../../types/sort";

export interface CoinTableProps {
  coins: Coin[];
  headers: { key: string; label: string }[];
  handleSort: (column: string) => void;
  sortSettings: SortSettings;
}
