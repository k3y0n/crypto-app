import axios from "axios";
import { IChart } from "../types/chart";
import { ICoin } from "../types/coin";

const API_KEY = import.meta.env.VITE_API_KEY;

interface IBTC {
  bitcoin: {
    usd: number;
  };
}

interface ITrendinCoin {
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

export const getCoins = async (
  query?: string,
  direction?: string,
  page?: number
): Promise<ICoin[]> => {
  const orderBy =
    direction && query === "" ? "market_cap_desc" : query + "_" + direction;
  const responce = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=false&locale=en&precision=2`,
    {
      params: {
        page: page,
        order: orderBy,
      },
      headers: {
        " x-cg-demo-api-key": API_KEY,
      },
    }
  );

  const { data } = responce;
  return data.filter(
    (coin: ICoin) => coin.current_price.toFixed(2) && coin.market_cap > 0
  );
};

export const getCoin = async (id: string): Promise<ICoin> => {
  const responce = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&precision=2`,
    {
      headers: {
        " x-cg-demo-api-key": API_KEY,
      },
    }
  );

  const { data } = responce;
  return data[0];
};

export const getCoinChart = async (
  id: string,
  day: number
): Promise<IChart> => {
  const responce = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${day}`,
    {
      headers: {
        " x-cg-demo-api-key": API_KEY,
      },
    }
  );

  const { data } = responce;
  return data;
};

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

const getTrendingData = async (): Promise<Array<ITrendinCoin>> => {
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

  const trendingData = coins.map((coin: ITrendinCoin) => {
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
