import axios from "axios";
import { ICoin } from "../types";

export const getCoinsPrices = async (
  ids: string[]
): Promise<{ [id: string]: number }> => {
  const response = await axios.get(
    `https://api.coincap.io/v2/assets?ids=${ids.join(",")}`
  );
  const { data } = response;

  const prices: { [id: string]: number } = {};

  data.data.forEach((item: ICoin) => {
    prices[item.id] = Number(item.priceUsd);
  });

  return prices;
};
