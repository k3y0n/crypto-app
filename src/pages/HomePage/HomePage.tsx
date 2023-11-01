import { useState } from "react";
import CoinTable from "../../components/CoinTable/CoinTable";
import Header from "../../components/Header/Header";
import Pagination from "../../ui/Pagination/Pagination";
import { calculateTotalPages, getPageSlice } from "../../utils/pagination";
import _ from "lodash";
import { HomeProps } from "./HomePageProps";
import { ICoin } from "../../types/coin";

const Home: React.FC<HomeProps> = ({
  coins,
  currentPage,
  sortSettings,
  handleSort,
  setCurrentPage,
}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<ICoin[]>(coins);

  const handleSearch = (search: string) => {
    setSearch(search);
    if (search.trim() === "") {
      setSearchResults(coins);
    } else {
      const results = coins.filter(
        (coin) =>
          coin.symbol.toLowerCase().includes(search.toLowerCase()) &&
          Number(coin.current_price.toFixed(2)) > 0
      );
      setSearchResults(results);
    }
  };

  const headers = [
    { key: "symbol", label: "Symbol" },
    { key: "name", label: "Coin" },
    { key: "current_price", label: "Price (USD)" },
    { key: "market_cap", label: "Market Cap" },
    { key: "price_change_percentage_24h", label: "Percent Change 24h" },
    { key: "actions", label: "Actions" },
  ];

  const totalPages = calculateTotalPages(
    searchResults.length > 0 ? searchResults.length : coins.length
  );

  const [startIndex, endIndex] = getPageSlice(currentPage);

  const displayedCoins =
    searchResults.length > 0
      ? searchResults.slice(startIndex, endIndex)
      : coins.slice(startIndex, endIndex);

  const searchResultsSliced = searchResults.slice(startIndex, endIndex);

  const filteredCoins = displayedCoins.filter(
    (item: ICoin) => Number(item.current_price.toFixed(2)) > 0
  );

  const sortedCoins = _.sortBy(filteredCoins, [sortSettings.column]) as ICoin[];

  if (sortSettings.direction === "desc") {
    sortedCoins.reverse();
  }

  return (
    <>
      <Header handleSearch={handleSearch} search={search} />
      {searchResults.length > 0 && search !== "" ? (
        <>
          <CoinTable
            coins={searchResultsSliced}
            headers={headers}
            handleSort={handleSort}
            sortSettings={sortSettings}
          />
          {searchResultsSliced.length !== 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : searchResults.length ? (
        <>
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
      ) : (
        <div> Not found coins</div>
      )}
    </>
  );
};

export default Home;
