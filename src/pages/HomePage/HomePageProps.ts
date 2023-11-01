import { ICoin } from "../../types/coin";
import { SortSettings } from "../../types/sort";

export interface HomeProps {
  coins: ICoin[];
  currentPage:number,
  sortSettings:SortSettings,
  handleSort: (str: string) => void;
  setCurrentPage: (page: number) => void;
}
