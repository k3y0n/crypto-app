import { useState,memo } from "react";
import Badge from "../../ui/Badge/Badge";
import { calculatePortfolioValue } from "../../utils/calculatePortfolio";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ICoin } from "../../types";
import { getCoinsPrices } from "../../api";
import { useQuery } from "react-query";
import styles from "./PortfolioInfo.module.scss";
import Loader from "../Loader/Loader";
import Modal from "../../ui/Modal/Modal";

const PortfolioInfo = () => {
  const [portfolio, _] = useLocalStorage([], "portfolio");
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(!isVisible);
  };
  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  const totalPortfolioValue = calculatePortfolioValue(portfolio);
  const coinIds = portfolio.map((coin: ICoin) => coin.id);

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["coinsCurrentPrice", coinIds],
    () => getCoinsPrices(coinIds)
  );

  let totalChange = 0;

  portfolio.forEach((coin: ICoin) => {
    if (data && coin.list) {
      coin.list.forEach((listItem: any) => {
        const currentPrice = data[coin.id];
        const buyPrice = listItem.buyPrice || 0;
        totalChange += (currentPrice - buyPrice) * coin.count;
      });
    }
  });

  const percentageChange = ((totalChange / totalPortfolioValue) * 100).toFixed(
    2
  );

  const percentageChangeDisplay =
    Number(percentageChange) > 0
      ? `+${percentageChange}%`
      : `${percentageChange}%`;

  const badgeColor = Number(percentageChange) > 0 ? "green" : "red";

  return (
    <>
      {isSuccess && (
        <div className={styles.portfolio} onClick={openModal}>
          <h2>My Portfolio</h2>
          <div className={styles.portfolio__balance}>
            <p> Balance {totalPortfolioValue.toFixed(2)} USD</p>
            <p>Change {totalChange.toFixed(2)} USD</p>
            <p>
              <Badge value={percentageChangeDisplay} color={badgeColor} />
            </p>
          </div>
        </div>
      )}
      {isVisible && (
        <Modal
          isVisible={isVisible}
          onClose={onCloseModal}
          selectedComponent={""}
        />
      )}
      {isLoading && <Loader width={577} height={180} />}
      {isError && "Error receiving prices for portfolio coins"}
    </>
  );
};

export default memo(PortfolioInfo);
