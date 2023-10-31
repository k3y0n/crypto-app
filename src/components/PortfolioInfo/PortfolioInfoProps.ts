import { ICoin } from "../../types/coin";

export interface PortfolioInfoProps {
  value: number;
  coinsData: ICoin[];
  coinPrices: { [id: string]: number };
}
