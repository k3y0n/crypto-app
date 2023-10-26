import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Coin } from "./types/coin";
import { getCoins } from "./lib/api";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import { useQuery } from "react-query";
import { SortSettings } from "./types/sort";
import CoinInfoPage from "./pages/CoinInfoPage/CoinInfoPage";

function App() {
  const coinsQuery = useQuery("coins", () =>
    getCoins(sortSettings.column, sortSettings.direction, 1)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortSettings, setSortSettings] = useState<SortSettings>({
    column: "market_cap",
    direction: "desc",
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

  if (coinsQuery.data && !coinsQuery.data.length) {
    return <div>Some error to get coins</div>;
  }

  if (coinsQuery.isLoading || coinsQuery.isFetching) {
    return <div>Loading...</div>;
  }

  if (coinsQuery.isError) {
    return <div>Error fetching data</div>;
  }

  const coins: Coin[] = coinsQuery.data!;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              coins={coins}
              handleSort={handleSort}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              sortSettings={sortSettings}
            />
          }
        />
        <Route path="/coinInfoPage/:id" element={<CoinInfoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
