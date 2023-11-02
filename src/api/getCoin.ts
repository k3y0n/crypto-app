import axios from "axios";
import { ICoin } from "../types";

export const getCoin = async (id: string): Promise<ICoin> => {
  const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);

  const { data } = response;
  return data.data;
};
