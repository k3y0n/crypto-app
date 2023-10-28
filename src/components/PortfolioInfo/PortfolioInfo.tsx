import React, { useState, useEffect } from "react";
import { PortfolioItem } from "../../types/portfolio";
import Badge from "../../ui/Badge/Badge";
import styles from "./PortfolioInfo.module.scss";
import Modal from "../../ui/Modal/Modal";
import PortfolioInfoLoader from "./PortfolioInfoLoader";

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
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isloading) {
    return <PortfolioInfoLoader />;
  }

  const openModal = () => {
    setIsVisible(!isVisible);
  };
  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  let totalChange = 0;

  if (!coinPrices.length) {
    return (
      <div className={styles["portfolio-card"]}>
        <div className={styles["no-coin-message"]}>No coin in portfolio</div>
      </div>
    );
  }

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
    <div className={styles.portfolio} onClick={openModal}>
      <h2>My Portfolio</h2>
      <div className={styles.portfolio__balance}>
        <p> Balance {value.toFixed(2)} USD</p>
        <p>Change {totalChange.toFixed(2)} USD</p>
        <p>
          <Badge
            value={`${
              Number(percentageChange) > 0
                ? `${percentageChange}+%`
                : `${percentageChange}-%`
            }`}
            color={Number(percentageChange) > 0 ? "green" : "red"}
          />
        </p>
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
