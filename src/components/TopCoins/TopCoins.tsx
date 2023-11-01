import { useQuery } from "react-query";
import { ITrending, getTrending } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import styles from "./TopCoins.module.scss";
import Loader from "../Loader/Loader";

const TopCoins = () => {
  const { data, isFetching, isError } = useQuery("trending", getTrending);
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/coin/${id}`);
  };

  if (isFetching) {
    return <Loader width={578} height={180} />;
  }

  if (isError) {
    return <div>Error getting trending coins</div>;
  }

  let filteredData: Array<ITrending> = [];

  if (data) {
    filteredData = data
      .filter((trending) => Number(trending.usdPrice.toFixed(2)) > 0)
      .slice(0, 3);
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <img
          src="https://s2.coinmarketcap.com/static/cloud/img/TrendingIcon.png?_=1f9e116"
          alt="Trending"
          className={styles.card__headerIcon}
        />
        <h2 className={styles.card__headerTitle}>Trending</h2>
      </div>
      <ul className={styles.card__coinList}>
        {filteredData &&
          filteredData.map((coin, index) => (
            <li
              className={styles.card__coinCard}
              key={coin.symbol}
              onClick={() => handleClick(coin.id)}
            >
              <p className={styles.card__coinIndex}>{index + 1}</p>
              <img
                className={styles.card__coinLogo}
                src={coin.image}
                alt={`${coin.name} logo`}
              />
              <p className={styles.card__title}>{coin.name}</p>
              <p className={styles.card__symbol}>
                {coin.symbol.toLocaleUpperCase()}
              </p>
              <p className={styles.card__usdPrice}>
                USD Price: {coin.usdPrice.toFixed(2)}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopCoins;
