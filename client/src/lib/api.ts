import axios from "axios";

export const getTokens = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/coinmarketcap");
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
