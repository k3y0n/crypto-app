import { ICoin } from "../types";

const calculateTotalPages = (totalItems: number): number => {
  const itemsPerPage = 10;
  return Math.ceil(totalItems / itemsPerPage);
};

const getPageSlice = (currentPage: number): [number, number] => {
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return [startIndex, endIndex];
};

export const pagination = (
  coins: ICoin[],
  currentPage: number
): [number, ICoin[]] => {
  const totalPages = calculateTotalPages(coins.length);
  const [startIndex, endIndex] = getPageSlice(currentPage);
  const displayedCoins = coins.slice(startIndex, endIndex);
  return [totalPages, displayedCoins];
};
