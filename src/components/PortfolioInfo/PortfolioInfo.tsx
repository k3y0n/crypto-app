import { useState, useEffect, useMemo, memo } from "react";
import { calculatePortfolioValue } from "../../utils/calculatePortfolio";
import { ICoin } from "../../types";
import { getCoinsPrices } from "../../api";
import { useQuery } from "react-query";
import styles from "./PortfolioInfo.module.scss";
import Loader from "../Loader/Loader";
import Badge from "../Badge/Badge";
import Modal from "../Modal/Modal";
import { PortfolioInfoProps } from "./PortfolioInfoProps";

const PortfolioInfo = ({ coins }: PortfolioInfoProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const totalPortfolioValue = useMemo(
    () => calculatePortfolioValue(coins),
    [coins]
  );

  const coinIds = coins.map((coin: ICoin) => coin.id);

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["coinsCurrentPrice", coinIds],
    () => getCoinsPrices(coinIds)
  );

  useEffect(() => {}, [coins, data]);

  const openModal = () => {
    setIsVisible(!isVisible);
  };

  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  let totalChange = 0;

  coins.forEach((coin: ICoin) => {
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
            <p> Change {totalChange.toFixed(2)} USD</p>
            <p>
              <Badge
                value={
                  percentageChangeDisplay === "NaN%"
                    ? "0%"
                    : `${percentageChange}%`
                }
                color={badgeColor}
              />
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
