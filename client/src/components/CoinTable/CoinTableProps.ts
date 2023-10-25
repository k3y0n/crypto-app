import Coin from "../../types/coin";

export interface CoinTableProps {
  coins: Coin[];
  headers: { key: string; label: string }[];
  setSort: (sort:string) => void;
}
