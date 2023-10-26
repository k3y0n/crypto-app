import axios from "axios";

export const getCoins = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/coinmarketcap`);
    const { data } = response;
    return data;
  } catch (error) {
    const err = new Error();
    throw new Error(err.message);
  }
};

export const getCoin = async (symbol: string) => {
  try {
    if (symbol === "") {
      throw new Error("Coin not found");
    }
    const response = await axios.get(
      `http://localhost:3000/api/coin/${symbol}`
    );
    const { data } = response;
    return data;
  } catch (error) {
    const err = new Error();
    throw new Error(err.message);
  }
};

export const getCoinChart = async (symbol: string) => {
  try {
    if (symbol === "") {
      throw new Error("Coin not found");
    }
    const response = await axios.get(
      `http://localhost:3000/api/coin/chart/${symbol}`
    );
    const { data } = response;
    return data;
  } catch (error) {
    const err = new Error();
    throw new Error(err.message);
  }
};
