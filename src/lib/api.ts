import axios from "axios";
import { ICoin } from "../types/coin";
import { IChart } from "../types/chart";

export const getCoins = async (
  query?: string,
  direction?: string,
  page?: number
) => {
  const responce = await axios.get<ICoin[]>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=false&locale=en`,
    {
      params: {
        page: page,
        order: query + "_" + direction,
      },
      headers: {
        " x-cg-demo-api-key": "CG-uWLv7ip3VyMJv5nFvJ4gSBFq",
      },
    }
  );

  const { data } = responce;
  return data;
};

export const getCoin = async (id: string) => {
  const responce = await axios.get<ICoin>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`,
    {
      headers: {
        " x-cg-demo-api-key": "CG-uWLv7ip3VyMJv5nFvJ4gSBFq",
      },
    }
  );

  const { data } = responce;
  return data;
};

export const getCoinChart = async (id: string, day: number) => {
  const responce = await axios.get<IChart>(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${day}`,
    {
      headers: {
        " x-cg-demo-api-key": "CG-uWLv7ip3VyMJv5nFvJ4gSBFq",
      },
    }
  );

  const { data } = responce;
  return data;
};
