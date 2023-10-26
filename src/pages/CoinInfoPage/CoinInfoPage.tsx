import { useParams, Link } from "react-router-dom";
import styles from "./CoinInfoPage.module.css";
import Button from "../../ui/Button/Button";
import CoinChart from "../../components/CoinChart/CoinChart";
import { Coin } from "../../types/coin";
import { useQuery } from "react-query";
import { getCoin } from "../../lib/api";

const CoinInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>No id coin </div>;
  }

  const { data, isLoading } = useQuery("coin", () => getCoin(id));

  if (isLoading) {
    return "Loading...";
  }

  const coin: Coin = Array.isArray(data) ? data[0] : [];

  if (!coin) {
    return "No Coin Available";
  }

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
        {/* <div className={styles.chartContainer}>
          {chartData && <CoinChart data={chartData} />}
        </div> */}
      </div>
    </div>
  );
};

export default CoinInfoPage;
