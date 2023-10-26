import axios from "axios";
import { Coin } from "../types/coin";

export const getCoins = async (
  query: string,
  direction: string,
  page: number
): Promise<Coin[]> => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=false&locale=en`,
      {
        params: {
          page: page,
          order: query + "_" + direction,
        },
        headers: {
          "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    const err = new Error();
    throw new Error(err.message);
  }
};

export const getCoin = async (id: string): Promise<Coin> => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&locale=en`,
      {
        headers: {
          "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    const err = new Error();
    throw new Error(err.message);
  }
};
