import { useEffect, useState } from "react";
import { ICoin } from "../types/coin";

export const useLocalStorage = (state: ICoin[], key: string) => {
  const getValue = () => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }

    return state;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
