import axios from "axios";
import { IChart } from "../types/chart";

export const getCoinChart = async (
  id: string,
  numberOfDays: number
): Promise<IChart[]> => {
  let start: number = 0;
  let end: number = 0;

  const now = Date.now();

  if (numberOfDays === 1) {
    start = now - 24 * 60 * 60 * 1000;
    end = now;
  } else if (numberOfDays === 7) {
    start = now - 7 * 24 * 60 * 60 * 1000;
    end = now;
  } else if (numberOfDays === 30) {
    start = now - 30 * 24 * 60 * 60 * 1000;
    end = now;
  }

  try {
    const response = await axios.get(
      `https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=${start}&end=${end}`
    );
    const { data } = response;

    return data.data.map((item: IChart) => ({
      priceUsd: Number(item.priceUsd),
      time: item.time,
      date: item.date,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
