import { useState, useMemo, useCallback,memo } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getCoin, getCoinChart } from "../../api";
import styles from "./CoinPage.module.scss";
import ChartCoin from "../../components/ChartCoin/ChartCoin";
import { formatPrice } from "../../utils/formatPrice";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";

const CoinPage = () => {
  const { id } = useParams() as { id: string };
  const [day, setDay] = useState("h1");
  const [selectedOptions, setSelectedOptions] = useState("1H");
  const [isVisible, setIsVisible] = useState(false);

  const chart = useQuery(["chart", id, day], () => getCoinChart(id, day));
  const { data, isSuccess, isLoading, isError } = useQuery(["coin", id], () =>
    getCoin(id)
  );

  const iconUrl = useMemo(() => {
    return `https://assets.coincap.io/assets/icons/${data?.symbol.toLowerCase()}@2x.png`;
  }, [data]);

  const handleClick = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptions(e.target.value);
  
    const dayMap: Record<string, string> = {
      "1H": "h1",
      "12H": "h12",
      "Day": "d1"
    };
  
    if (dayMap[e.target.value]) {
      setDay(dayMap[e.target.value]);
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
            <img src={iconUrl} alt={data.name} />
            <span id={data.id.toString()}>{data.name}</span>
          </p>
          <div className={styles.coinInfoBody}>
            <div>
              <p>Symbol: {data.symbol}</p>
              <p>Rank: {data.rank}</p>
              <p>Supply: {formatPrice(data.supply)}</p>
            </div>
            <div>
              <p>Price: {formatPrice(Number(data.priceUsd))}$</p>
              <p>Market Cap: {formatPrice(data.marketCapUsd)}$</p>
              {data.maxSupply && (
                <p>Max Supply: {formatPrice(data.maxSupply)}</p>
              )}
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
        <option value="1H">1H</option>
        <option value="12H">12H</option>
        <option value="Day">Day</option>
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

export default memo(CoinPage);
