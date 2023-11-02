import { useState, useEffect } from "react";
import CoinTable from "../../components/CoinTable/CoinTable";
import _ from "lodash";
import Header from "../../components/Header/Header";
import { ICoin } from "../../types";
import { pagination } from "../../utils/pagination";
import Pagination from "../../ui/Pagination/Pagination";
import { useQuery } from "react-query";
import { getCoins } from "../../api";

const Home = () => {
  const { data, isSuccess, isLoading, isError } = useQuery(["coins"], getCoins);

  useEffect(() => {
    if (data) {
      setSearchResults(
        data.filter((coin: ICoin) => {
          return Number(coin.priceUsd.toFixed(2)) > 0;
        })
      );
    }
  }, [data]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<ICoin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, displayCoins] = pagination(searchResults, currentPage);

  const handleSearch = (search: string) => {
    setSearch(search);
    if (data) {
      const results = data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) &&
          Number(coin.priceUsd.toFixed(2)) > 0
      );
      setSearchResults(results);
    }
  };

  return (
    <>
      {isSuccess && (
        <>
          <Header search={search} handleSearch={handleSearch} />
          {displayCoins.length ? (
            <CoinTable coins={displayCoins} />
          ) : (
            "No search results"
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      {isLoading && "Loading..."}
      {isError && "Error fetching data"}
    </>
  );
};

export default Home;
