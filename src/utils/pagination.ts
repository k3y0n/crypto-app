import { ICoin } from "../types";

export const paginate = (
  coins: ICoin[],
  currentPage: number,
  pageSize: number
): ICoin[] => {
  const startIndex = (currentPage - 1) * pageSize;
  return [...coins].splice(startIndex, pageSize);
};
