import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getCoin, getCoinChart } from "../../lib/api";
import Button from "../../ui/Button/Button";
import styles from "./CoinPage.module.scss";
import Modal from "../../ui/Modal/Modal";
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

  return (
    <div className={styles.coinPageContainer}>
      <Link to="/" className={styles.back}>
        Back to Table
      </Link>
      {coinData.data && (
        <div className={styles.coinInfo}>
          <p className={styles.coinHeader}>
            <img src={coinData.data.image} alt={coinData.data.name} />
            <span id={coinData.data.id.toString()}>{coinData.data.name}</span>
          </p>
          <div className={styles.coinInfoBody}>
            <div>
              <p>Symbol: {coinData.data.symbol}</p>
              <p>Rank: {coinData.data.market_cap_rank}</p>
              <p>Supply: {coinData.data.total_supply}</p>
            </div>
            <div>
              <p>Price: {coinData.data.current_price}$</p>
              <p>Market Cap: {coinData.data.market_cap}$</p>
              <p>Max Supply: {coinData.data.max_supply}</p>
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
      {isVisible && coinData.data && (
        <Modal
          isVisible={isVisible}
          selectedComponent={"Form"}
          onClose={onCloseModal}
          coinData={coinData.data}
        />
      )}
    </div>
  );
};

export default CoinPage;
