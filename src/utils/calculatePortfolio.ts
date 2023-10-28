import { PortfolioItem } from "../types/portfolio";

export function calculatePortfolioValue(coins: PortfolioItem[]): number {
  return coins.reduce((acc: number, coin: PortfolioItem): number => {
    coin.list.forEach((transaction) => {
      acc += transaction.totalSum;
    });
    return acc;
  }, 0);
}
