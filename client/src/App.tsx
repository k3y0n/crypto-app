import "./App.css";
import { useQuery } from "react-query";
import { Routes, Route } from "react-router-dom";
import Coin from "./types/coin";
import { getCoins } from "./lib/api";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import CoinInfo from "./pages/CoinInfo/CoinInfo";

function App() {
  const coinsQuery = useQuery("tokens", getCoins);

  const coins: Coin[] = coinsQuery.data || [];

  if (coinsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (coinsQuery.isError && coinsQuery.error instanceof Error) {
    return <div>Error: {coinsQuery.error?.message}</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/CoinInfo/:id" element={<CoinInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
