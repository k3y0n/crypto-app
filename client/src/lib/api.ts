import axios from "axios";

export const getTokens = async (start: number, sort: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/coinmarketcap?start=${start}&sort=${sort}`
    );
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
