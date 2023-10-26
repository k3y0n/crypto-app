import { useParams, Link } from "react-router-dom";
import styles from "./CoinInfoPage.module.css";
import { useState } from "react";
import Button from "../../ui/Button/Button";
import { useQuery } from "react-query";
import { getCoin, getCoinChart } from "../../lib/api";
import CoinChart from "../../components/CoinChart/CoinChart";

const CoinInfoPage = () => {
  const { id } = useParams<string>();
  const [day, setDay] = useState(1);

  const { data, isLoading, isError, error } = useQuery("coin", () =>
    id ? getCoin(id) : undefined
  );

  const { data: chartData } = useQuery("coinChart", () =>
    id && day ? getCoinChart(id, day) : undefined
  );

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return `Error fetching data: ${error.message}`;
  }

  if (!data) {
    return "No data available.";
  }

  const coin =
    data && Array.isArray(data) && data.length > 0 ? data[0] : undefined;
  const coinChart = chartData && chartData.prices;

  return (
    <div className={styles.coinInfoContainer}>
      <Link to="/">Back to Table</Link>
      <h1 id={coin.id.toString()}>{coin.name}</h1>
      <div className={styles.infoContainer}>
        <div className={styles.coinDetails}>
          <img src={coin.image} alt={coin.name} className={styles.coinImage} />
          <p>Symbol: {coin.symbol}</p>
          <p>Rank: {coin.market_cap_rank}</p>
          <p>Supply: {coin.total_supply}</p>
          <p>Price: {coin.current_price}$</p>
          <p>Market Cap: {coin.market_cap}$</p>
          <p>Max Supply: {coin.max_supply}</p>
          <Button
            className={styles.addButton}
            onClick={() => console.log("add")}
          >
            Add to Portfolio
          </Button>
        </div>
        <div className={styles.chartContainer}>
          {data && <CoinChart coinChart={coinChart} onSetDay={setDay} />}
        </div>
      </div>
    </div>
  );
};

export default CoinInfoPage;
