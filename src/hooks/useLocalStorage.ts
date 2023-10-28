import { useEffect, useState } from "react";
import { PortfolioItem } from "../types/portfolio";

export const useLocalStorage = (state: PortfolioItem[], key: string) => {
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
