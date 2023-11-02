import axios from "axios";
import { IChart } from "../types/chart";
import { ICoin } from "../types/coin";

const API_KEY = import.meta.env.VITE_API_KEY;

interface IBTC {
  bitcoin: {
    usd: number;
  };
}

interface ITrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    price_btc: number;
  };
}

export interface ITrending {
  id: string;
  name: string;
  usdPrice: number;
  symbol: string;
  image: string;
}







const getBTCPrice = async (): Promise<IBTC> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_last_updated_at=true&precision=2`,
    {
      headers: {
        "x-cg-demo-api-key": API_KEY,
      },
    }
  );

  const data = response.data;

  return data.bitcoin.usd;
};

const getTrendingData = async (): Promise<Array<ITrendingCoin>> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/search/trending`,
    {
      headers: {
        "x-cg-demo-api-key": API_KEY,
      },
    }
  );

  const coins = response.data.coins;
  return coins;
};

export const getTrending = async (): Promise<ITrending[]> => {
  const coins = await getTrendingData();
  const priceBTC = await getBTCPrice();

  const trendingData = coins.map((coin: ITrendingCoin) => {
    const { id, name, symbol, thumb, price_btc } = coin.item;
    const usdPrice = typeof priceBTC === "number" ? price_btc * priceBTC : 0;

    return {
      id,
      name,
      usdPrice,
      symbol,
      image: thumb,
    };
  });

  return trendingData;
};

export async function getCoinPrices(
  ids: string[]
): Promise<{ [id: string]: number }> {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
      ","
    )}&vs_currencies=usd`
  );
  const { data } = response;

  const prices: { [id: string]: number } = {};

  ids.forEach((id) => {
    prices[id] = data[id]?.usd || 0;
  });

  return prices;
}
