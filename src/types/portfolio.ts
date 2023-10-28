export interface PortfolioItem {
  id: string;
  symbol: string;
  image: string;
  count: number;
  list: {
    coins: number;
    buyPrice: number;
    totalSum: number;
  }[];
}
