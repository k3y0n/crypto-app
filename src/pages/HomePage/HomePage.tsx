import { useState, useEffect, useCallback, memo } from "react";
import CoinTable from "../../components/CoinTable/CoinTable";
import Header from "../../components/Header/Header";
import { debounce } from "lodash";
import { ICoin } from "../../types";
import { useQuery } from "react-query";
import { getCoins } from "../../api";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import { paginate } from "../../utils/pagination";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<ICoin[]>([]);

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["coins", currentPage, search],
    () => getCoins(search, currentPage)
  );

  useEffect(() => {
    if (data) {
      setSearchResults(
        data.filter((coin: ICoin) => {
          return (
            Number(coin.priceUsd.toFixed(2)) &&
            Number(coin.marketCapUsd.toFixed(2)) > 0
          );
        })
      );
    }
  }, [data, currentPage]);

  const totalPage = searchResults.length / 10;

  const displayedCoins = paginate(searchResults, currentPage, 10);

  const handleSearch = debounce(
    useCallback(
      (search: string) => {
        setSearch(search);
        setCurrentPage(1);
      },
      [data]
    ),
    500
  );

  return (
    <>
      <Header search={search} handleSearch={handleSearch} />
      {isSuccess && (
        <>
          {displayedCoins.length ? (
            <CoinTable coins={displayedCoins} />
          ) : (
            "No search results"
          )}
          {displayedCoins.length && (
            <Pagination
              totalPages={totalPage}
              currentPage={currentPage}
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

export default memo(Home);
