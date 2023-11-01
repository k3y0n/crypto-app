import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getCoin, getCoinChart } from "../../lib/api";
import Button from "../../ui/Button/Button";
import styles from "./CoinPage.module.scss";
import Modal from "../../ui/Modal/Modal";
import ChartCoin from "../../components/ChartCoin/ChartCoin";
import Loader from "../../components/Loader/Loader";

const CoinPage = () => {
  const { id } = useParams() as { id: string };
  const [day, setDay] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState("Day");

  const chart = useQuery(["chart", id, day], () => getCoinChart(id, day));

  const [isVisible, setIsVisible] = useState(false);

  const { data, isLoading, isError } = useQuery(["coin", id], () =>
    getCoin(id)
  );

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  if (isLoading) {
    return <Loader width={1200} height={700} />;
  }

  if (isError) {
    return "Error loading";
  }

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
      {data && (
        <div className={styles.coinInfo}>
          <p className={styles.coinHeader}>
            <img src={data.image} alt={data.name} />
            <span id={data.id.toString()}>{data.name}</span>
          </p>
          <div className={styles.coinInfoBody}>
            <div>
              <p>Symbol: {data.symbol}</p>
              <p>Rank: {data.market_cap_rank}</p>
              <p>Supply: {data.total_supply}</p>
            </div>
            <div>
              <p>Price: {data.current_price}$</p>
              <p>Market Cap: {data.market_cap}$</p>
              <p>Max Supply: {data.max_supply}</p>
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
      {chart.data &&  (
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
    </div>
  );
};

export default CoinPage;
