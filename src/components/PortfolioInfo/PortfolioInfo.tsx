import React, { useState, useEffect } from "react";
import Badge from "../../ui/Badge/Badge";
import styles from "./PortfolioInfo.module.scss";
import Modal from "../../ui/Modal/Modal";
import { PortfolioInfoProps } from "./PortfolioInfoProps";
import Loader from "../Loader/Loader";

const PortfolioInfo: React.FC<PortfolioInfoProps> = ({
  value,
  coinsData,
  coinPrices,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader width={577} height={180} />;
  }

  const openModal = () => {
    setIsVisible(!isVisible);
  };
  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  let totalChange = 0;

  coinsData.forEach((coin) => {
    if (coin && coin.count) {
      const currentPrice = coinPrices[coin.id];
      const buyPrice = (coin.list && coin.list[0].buyPrice) || 0;
      totalChange += (currentPrice - buyPrice) * coin.count;
    }
  });

  const percentageChange = ((totalChange / value) * 100).toFixed(2);

  return (
    <>
      {coinsData.length ? (
        <div className={styles.portfolio} onClick={openModal}>
          <h2>My Portfolio</h2>
          <div className={styles.portfolio__balance}>
            <p> Balance {value.toFixed(2)} USD</p>
            <p>Change {totalChange.toFixed(2)} USD</p>
            <p>
              <Badge
                value={`${
                  Number(percentageChange) > 0
                    ? `+${percentageChange}%`
                    : `${percentageChange}%`
                }`}
                color={Number(percentageChange) > 0 ? "green" : "red"}
              />
            </p>
          </div>
          {isVisible && (
            <Modal
              isVisible={isVisible}
              onClose={onCloseModal}
              selectedComponent={""}
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default PortfolioInfo;
