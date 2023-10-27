import {ICoin} from "../../types/coin";
import { SortSettings } from "../../types/sort";

export interface CoinTableProps {
  coins: ICoin[];
  headers: { key: string; label: string }[];
  handleSort: (column: string) => void;
  sortSettings: SortSettings;
}
