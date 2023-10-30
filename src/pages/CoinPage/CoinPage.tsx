import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getCoin, getCoinChart } from "../../lib/api";
import Button from "../../ui/Button/Button";
import styles from "./CoinPage.module.scss";
import Modal from "../../ui/Modal/Modal";
import { ICoin } from "../../types/coin";
import CoinPageLoader from "./CoinPageLoader";
import ChartCoin from "../../components/ChartCoin/ChartCoin";

const CoinPage = () => {
  const { id } = useParams() as { id: string };

  const [day, setDay] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("Day");

  const { data, isLoading, isError } = useQuery(["chart", id, day], () =>
    getCoinChart(id, day)
  );
  const coinData = useQuery(["coin", id], () => getCoin(id));

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  if (isLoading) {
    return <CoinPageLoader />;
  }

  if (isError) {
    return "Error loading";
  }

  let coin: ICoin | undefined = undefined;

  if (coinData.status === "success" && Array.isArray(coinData.data)) {
    coin = coinData.data[0];
  }

  return (
    <div className={styles.coinPageContainer}>
      <Link to="/" className={styles.back}>
        Back to Table
      </Link>
      {coin && (
        <div className={styles.coinInfo}>
          <p className={styles.coinHeader}>
            <img src={coin.image} alt={coin.name} />
            <span id={coin.id.toString()}>{coin.name}</span>
          </p>
          <div className={styles.coinInfoBody}>
            <div>
              <p>Symbol: {coin.symbol}</p>
              <p>Rank: {coin.market_cap_rank}</p>
              <p>Supply: {coin.total_supply}</p>
            </div>
            <div>
              <p>Price: {coin.current_price}$</p>
              <p>Market Cap: {coin.market_cap}$</p>
              <p>Max Supply: {coin.max_supply}</p>
            </div>
          </div>
          <Button onClick={handleClick}>Add Coins</Button>
        </div>
      )}
      {data && (
        <ChartCoin
          data={data}
          currentOptions={selectedOptions}
          setDay={setDay}
          setOptions={setSelectedOptions}
        />
      )}
      {isVisible && coin && (
        <Modal
          isVisible={isVisible}
          selectedComponent={"Form"}
          onClose={onCloseModal}
          coinData={coin}
        />
      )}
    </div>
  );
};

export default CoinPage;
