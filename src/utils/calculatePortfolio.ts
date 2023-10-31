import { ICoin } from "../types/coin";

export function calculatePortfolioValue(coins: ICoin[]): number {
  return coins.reduce((acc: number, coin: ICoin): number => {
    if (coin.list) {
      coin.list.forEach((transaction) => {
        acc += transaction.totalSum;
      });
    }
    return acc;
  }, 0);
}
