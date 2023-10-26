import { Coin } from "../../types/coin";
import { SortSettings } from "../../types/sort";

export interface HomeProps {
  coins: Coin[];
  currentPage:number,
  sortSettings:SortSettings,
  handleSort: (str: string) => void;
  setCurrentPage: (page: number) => void;
}
