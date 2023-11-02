import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getCoin, getCoinChart } from "../../api";
import Button from "../../ui/Button/Button";
import styles from "./CoinPage.module.scss";
import Modal from "../../ui/Modal/Modal";
import ChartCoin from "../../components/ChartCoin/ChartCoin";
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../utils/formatPrice";

const CoinPage = () => {
  const { id } = useParams() as { id: string };
  const [day, setDay] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState("Day");

  const chart = useQuery(["chart", id, day], () => getCoinChart(id, day));

  const [isVisible, setIsVisible] = useState(false);

  const { data, isSuccess, isLoading, isError } = useQuery(["coin", id], () =>
    getCoin(id)
  );

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptions(e.target.value);
    switch (e.target.value) {
      case "Day":
        setDay(1);
        break;
      case "Week":
        setDay(7);
        break;
      case "Month":
        setDay(30);
        break;
    }
  };

  return (
    <div className={styles.coinPageContainer}>
      <Link to="/" className={styles.back}>
        Back to Table
      </Link>
      {isSuccess && (
        <div className={styles.coinInfo}>
          <p className={styles.coinHeader}>
            <img
              src={`https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`}
              alt={data.name}
            />
            <span id={data.id.toString()}>{data.name}</span>
          </p>
          <div className={styles.coinInfoBody}>
            <div>
              <p>Symbol: {data.symbol}</p>
              <p>Rank: {data.rank}</p>
              <p>Supply: {data.supply}</p>
            </div>
            <div>
              <p>Price: {formatPrice(data.priceUsd)}$</p>
              <p>Market Cap: {formatPrice(data.marketCapUsd)}$</p>
              <p>Max Supply: {formatPrice(data.maxSupply)}</p>
            </div>
          </div>
          <Button onClick={handleClick} label={"Add Coins"} />
        </div>
      )}
      <select
        className={styles.select}
        onChange={(e) => handleChange(e)}
        value={selectedOptions}
      >
        <option value="Day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
      </select>
      {chart.data && (
        <ChartCoin data={chart.data} selectedOptions={selectedOptions} />
      )}
      {isVisible && data && (
        <Modal
          isVisible={isVisible}
          selectedComponent={"Form"}
          onClose={onCloseModal}
          coinData={data}
        />
      )}
      {isError && "Error get coin data"}
      {isLoading && <Loader width={1200} height={700} />}
    </div>
  );
};

export default CoinPage;
