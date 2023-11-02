export interface ICoin {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: number;
  marketCapUsd: number;
  priceUsd: number;
  changePercent24Hr: number;
  count: number;
  list: {
    coins: number;
    buyPrice: number;
    totalSum: number;
  }[];
}
