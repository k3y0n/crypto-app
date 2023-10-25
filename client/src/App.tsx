import "./App.css";
import { getTokens } from "./lib/api";
import { useQuery } from "react-query";
import Coin from "./types/coin";
import CoinTable from "./components/CoinTable/CoinTable";
import Pagination from "./ui/Pagination/Pagination";

function App() {
  const { isLoading, error, data } = useQuery("tokens", getTokens);
  const coins: Coin[] = data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <CoinTable coins={coins} />
      <Pagination currentPage={1} />
    </>
  );
}

export default App;
