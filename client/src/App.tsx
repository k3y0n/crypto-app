import { useState } from "react";
import "./App.css";
import { useQuery } from "react-query";
import Coin from "./types/coin";
import CoinTable from "./components/CoinTable/CoinTable";
import Pagination from "./ui/Pagination/Pagination";
import { calculateTotalPages, getPageSlice } from "./utils/pagination";
import { getTokens } from "./lib/api";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSortBy] = useState("");

  const coinsQuery = useQuery("tokens", () => getTokens(currentPage, sort));

  const headers = [
    { key: "symbol", label: "Symbol" },
    { key: "logo", label: "Logo" },
    { key: "price", label: "Price (USD)" },
    { key: "marketCap", label: "Market Cap" },
    { key: "change24h", label: "Change (24h)" },
    { key: "action", label: "Action" },
  ];

  const coins: Coin[] = coinsQuery.data || [];

  const totalPages = calculateTotalPages(coins.length || 0);
  const [startIndex, endIndex] = getPageSlice(currentPage);
  const displayedCoins = coins.slice(startIndex, endIndex);

  if (coinsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (coinsQuery.isError) {
    return <div>Error: {coinsQuery.error?.message}</div>;
  }

  return (
    <>
      <CoinTable coins={displayedCoins} headers={headers} setSort={setSortBy} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default App;
