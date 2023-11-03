import axios from "axios";
import { IChart } from "../types/chart";

export const getCoinChart = async (
  id: string,
  numberOfDays: string
): Promise<IChart[]> => {

  try {
    const response = await axios.get(
      `https://api.coincap.io/v2/assets/${id}/history?interval=${numberOfDays}`
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
