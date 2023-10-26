export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h:number,
  market_cap: number;
  market_cap_rank: number;
  total_supply: number;
  max_supply: number;
  price_change_24h: number;
}
