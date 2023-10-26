import { useState } from "react";
import CoinTable from "../../components/CoinTable/CoinTable";
import Header from "../../components/Header/Header";
import Pagination from "../../ui/Pagination/Pagination";
import { calculateTotalPages, getPageSlice } from "../../utils/pagination";
import { Coin } from "../../types/coin";
import _ from "lodash";
import { HomeProps } from "./HomeProps";

const Home: React.FC<HomeProps> = ({
  coins,
  currentPage,
  sortSettings,
  handleSort,
  setCurrentPage,
}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Coin[]>([]);

  const handleSearch = (search: string) => {
    setSearch(search);
    if (search.trim() === "") {
      setSearchResults([]);
    } else {
      const results = coins.filter((coin) =>
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const headers = [
    { key: "symbol", label: "Symbol" },
    { key: "logo", label: "Logo" },
    { key: "current_price", label: "Price (USD)" },
    { key: "market_cap", label: "Market Cap" },
    { key: "price_change_percentage_24h", label: "Percent Change 24h" },
    { key: "actions", label: "Actions" },
  ];

  const totalPages = calculateTotalPages(
    searchResults.length > 0 ? searchResults.length : coins.length || 0
  );

  const [startIndex, endIndex] = getPageSlice(currentPage);

  const displayedCoins =
    searchResults.length > 0
      ? searchResults.slice(startIndex, endIndex)
      : coins.slice(startIndex, endIndex);


  const filteredCoins = displayedCoins.filter(
    (item: Coin) => Number(item.current_price.toFixed(2)) > 0
  );

  const sortedCoins = _.sortBy(filteredCoins, [sortSettings.column]) as Coin[];

  if (sortSettings.direction === "desc") {
    sortedCoins.reverse();
  }

  return (
    <>
      <Header handleSearch={handleSearch} search={search} />
      <CoinTable
        coins={sortedCoins}
        headers={headers}
        handleSort={handleSort}
        sortSettings={sortSettings}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Home;
