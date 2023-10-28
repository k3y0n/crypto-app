import React, { useState } from "react";
import { PortfolioItem } from "../../types/portfolio";
import Badge from "../../ui/Badge/Badge";
import styles from "./PortfolioInfo.module.scss";
import Modal from "../../ui/Modal/Modal";

interface PortfolioInfoProps {
  value: number;
  coinsData: PortfolioItem[];
  coinPrices: { [id: string]: number };
}

const PortfolioInfo: React.FC<PortfolioInfoProps> = ({
  value,
  coinsData,
  coinPrices,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => {
    setIsVisible(!isVisible);
  };
  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  let totalChange = 0;

  coinsData.forEach((coin) => {
    const currentPrice = coinPrices[coin.id];
    const buyPrice = coin.list[0].buyPrice;
    totalChange += (currentPrice - buyPrice) * coin.count;
  });

  const percentageChange = isNaN((totalChange / value) * 100)
    ? 0
    : ((totalChange / value) * 100).toFixed(2);

  if (percentageChange === 0) {
    return (
      <div className={styles["portfolio-card"]}>
        <div className={styles["no-coin-message"]}>No coin in portfolio</div>
      </div>
    );
  }

  return (
    <div className={styles["portfolio-card"]} onClick={openModal}>
      <div className={styles["card-content"]}>
        <span className={styles["value"]}>{value.toFixed(2)} USD</span>
        <span className={styles["change"]}>
          {totalChange.toFixed(2)}USD (
          <div className={styles["badge-wrapper"]}>
            <Badge
              value={percentageChange}
              color={Number(percentageChange) > 0 ? "green" : "red"}
            />
            {Number(percentageChange) > 0 ? "+%" : "-%"}
          </div>
          )
        </span>
      </div>
      {isVisible && coinsData && (
        <Modal
          isVisible={isVisible}
          onClose={onCloseModal}
          selectedComponent={""}
          portfolioData={coinsData}
        />
      )}
    </div>
  );
};

export default PortfolioInfo;
