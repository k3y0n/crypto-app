import { useState } from "react";
import CoinTable from "../../components/CoinTable/CoinTable";
import Header from "../../components/Header/Header";
import Pagination from "../../ui/Pagination/Pagination";
import { calculateTotalPages, getPageSlice } from "../../utils/pagination";
import Coin from "../../types/coin";
import { SortSettings } from "../../types/sort";
import _ from "lodash";

interface HomeProps {
  coins: Coin[];
}

const Home: React.FC<HomeProps> = ({ coins }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Coin[]>([]);
  const [sortSettings, setSortSettings] = useState<SortSettings>({
    column: null,
    direction: "asc",
  });

  const handleSort = (column: string) => {
    setSortSettings((prevSettings) => {
      if (column === prevSettings.column) {
        return {
          ...prevSettings,
          direction: prevSettings.direction === "asc" ? "desc" : "asc",
        };
      }
      return { ...prevSettings, column };
    });
  };

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
    { key: "price", label: "Price (USD)" },
    { key: "marketCap", label: "Market Cap" },
    { key: "percentChange24h", label: "Percent Change 24h" },
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

  const sortedCoins = _.sortBy(displayedCoins, [sortSettings.column]) as Coin[];

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
