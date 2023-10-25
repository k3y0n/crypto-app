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

export const getCoin = async (id:number) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/coinmarketcap`);
    const { data } = response;
    return data;
  } catch (error) {
    const err = new Error();
    throw new Error(err.message);
  }
};
