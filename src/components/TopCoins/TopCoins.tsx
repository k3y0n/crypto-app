import {memo} from 'react'
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./TopCoins.module.scss";
import { getTraiding } from "../../api";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

const TopCoins = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["traiding"],
    getTraiding
  );

  const handleClick = (id: string) => {
    navigate(`/coin/${id}`);
  };

  return (
    <>
      {isSuccess && (
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
            {data.map((coin, index) => (
              <li
                className={styles.card__coinCard}
                key={coin.symbol}
                onClick={() => handleClick(coin.id)}
              >
                <p className={styles.card__coinIndex}>{index + 1}</p>
                <img
                  className={styles.card__coinLogo}
                  src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                  alt={coin.name}
                />
                <p className={styles.card__name}>{coin.name}</p>
                <p className={styles.card__symbol}>
                  {coin.symbol.toLocaleUpperCase()}
                </p>
                <p className={styles.card__usdPrice}>
                  USD Price: {formatPrice(coin.priceUsd)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isLoading && <Loader width={578} height={180} />}
      {isError && "Error get traiding coins"}
    </>
  );
};

export default memo(TopCoins);
