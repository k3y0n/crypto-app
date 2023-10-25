interface Coin {
  id: number;
  name: string;
  logo: string;
  symbol: string;
  price: number;
  percentChange24h: number;
  marketCap: number;
}

export default Coin;
