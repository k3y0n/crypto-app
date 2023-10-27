import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getCoins } from "./lib/api";
import Home from "./pages/HomePage/HomePage";
import { useQuery } from "react-query";
import { SortSettings } from "./types/sort";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ICoin } from "./types/coin";
import CoinPage from "./pages/CoinPage/CoinPage";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortSettings, setSortSettings] = useState<SortSettings>({
    column: "",
    direction: "asc",
  });

  const { data, isFetching, isError } = useQuery(["coins"], () =>
    getCoins(sortSettings.column, sortSettings.direction, currentPage)
  );

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

  

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  let coins: ICoin[] | undefined = undefined;

  if (data) {
    coins = data;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            coins && (
              <Home
                coins={coins}
                handleSort={handleSort}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                sortSettings={sortSettings}
              />
            )
          }
        />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
