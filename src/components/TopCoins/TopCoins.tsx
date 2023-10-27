import { useQuery } from "react-query";
import { ITrending, getTrending } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import {} from "react-bootstrap-icons";
import styles from "./TopCoins.module.scss";

const TopCoins = () => {
  const { data, isFetching, isError } = useQuery("trending", getTrending);
  const navigate = useNavigate();

  const handleClick = (id:string) => {  
    navigate(`/coin/${id}`);
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error getting trending coins</div>;
  }

  let filteredData: Array<ITrending> | undefined = undefined;

  if (data) {
    filteredData = data
      .filter((trending) => Number(trending.usdPrice.toFixed(2)) > 0)
      .slice(0, 3);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          src="https://s2.coinmarketcap.com/static/cloud/img/TrendingIcon.png?_=1f9e116"
          alt="Trending"
        />
        <h2>Trending</h2>
      </div>
      <div className={styles.coinList}>
        {filteredData &&
          filteredData.map((coin, index) => (
            <div className={styles.coinCard} key={coin.symbol}>
              <div
                className={styles.cardHeader}
                onClick={() => handleClick(coin.id)}
              >
                <p>{index + 1}</p>
                <img src={coin.image} alt={`${coin.name} logo`} />
                <span className={styles.cardTitle}>{coin.name}</span>
                <p className={styles.coinSymbol}>
                  {coin.symbol.toLocaleUpperCase()}
                </p>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.usdPrice}>
                  USD Price: {coin.usdPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopCoins;
