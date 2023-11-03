import { useState, useEffect, useCallback } from "react";
import CoinTable from "../../components/CoinTable/CoinTable";
import _ from "lodash";
import Header from "../../components/Header/Header";
import { ICoin } from "../../types";
import Pagination from "../../ui/Pagination/Pagination";
import { useQuery } from "react-query";
import { getCoins } from "../../api";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["coins", currentPage],
    () => getCoins(currentPage)
  );

  useEffect(() => {
    if (data) {
      setSearchResults(
        data.filter((coin: ICoin) => {
          return Number(coin.priceUsd.toFixed(2)) > 0;
        })
      );
    }
  }, [data, currentPage]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<ICoin[]>([]);

  const totalPages = 8;

  const handleSearch = useCallback(
    (search: string) => {
      setSearch(search);
      if (data) {
        const results = data.filter((coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(results);
      }
    },
    [data]
  );

  return (
    <>
      <Header search={search} handleSearch={handleSearch} />
      {isSuccess && (
        <>
          {searchResults.length ? (
            <CoinTable coins={searchResults} />
          ) : (
            "No search results"
          )}
          {searchResults.length >= 8 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
      {isLoading && <Loader width={1200} height={600} />}
      {isError && "Error fetching data"}
    </>
  );
};

export default Home;
