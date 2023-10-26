import { useParams, Link } from "react-router-dom";

import { useQuery } from "react-query";
import { getCoin, getCoinChart } from "../../lib/api";

const CoinInfoPage = () => {
  const { symbol } = useParams<{ symbol: string }>();

  if (symbol === undefined) {
    return <div>Error: Coin is undefined</div>;
  }

  const {
    data: coinData,
    isLoading,
    isError,
    error,
  } = useQuery("coin", () => getCoin(symbol));

  const {
    data: chartData,
    isLoading,
    isError,
    error,
  } = useQuery("coin", () => getCoinChart(symbol));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const { id, name, rank, supply, price, marketCap, maxSupply, logo } =
    coinData;

  return (
    <div>
      <Link to="/">Back to Table</Link>
      <h1 id={id}>{name}</h1>
      <img src={logo} alt={name} />
      <p>Symbol: {symbol}</p>
      <p>Rank: {rank}</p>
      <p>Supply: {supply}</p>
      <p>Price: {price}$</p>
      <p>Market Cap: {marketCap}$</p>
      <p>Max Supply: {maxSupply}</p>
      <button>Add to Portfolio</button>
    </div>
  );
};

export default CoinInfoPage;
