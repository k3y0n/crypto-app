import axios from "axios";
import { ICoin } from "../types/coin";

export const getCoins = async (search:string,page: number): Promise<ICoin[]> => {
  const offset = 10 * (page - 1);
  const response = await axios.get(
    `https://api.coincap.io/v2/assets?search=${search}`
  );

  const { data } = response;
  return data.data.map((coin: ICoin) => ({
    id: coin.id,
    rank: Number(coin.rank),
    symbol: coin.symbol,
    name: coin.name,
    supply: Number(coin.supply),
    maxSupply: Number(coin.maxSupply),
    marketCapUsd: Number(coin.marketCapUsd),
    priceUsd: Number(coin.priceUsd),
    changePercent24Hr: Number(coin.changePercent24Hr),
  }));
};
