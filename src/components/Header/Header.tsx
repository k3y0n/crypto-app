import React from "react";
import Search from "../Search/Search";
import { HeaderProps } from "./HeaderProps";
import TopCoins from "../TopCoins/TopCoins";
import PortfolioInfo from "../PortfolioInfo/PortfolioInfo";
import { calculatePortfolioValue } from "../../utils/calculatePortfolio";
import { getCoinPrices } from "../../lib/api";
import { useQuery } from "react-query";
import { ICoin } from "../../types/coin";
import styles from "./Header.module.scss";
import Loader from "../Loader/Loader";

const Header: React.FC<HeaderProps> = ({ handleSearch, search }) => {
  const portfolioData = localStorage.getItem("portfolio");
  const portfolio = portfolioData ? JSON.parse(portfolioData) : [];
  const totalPortfolioValue = calculatePortfolioValue(portfolio);

  const coinIds = portfolio.map((coin: ICoin) => coin.id);
  const {
    data: coinPrices,
    isLoading,
    isError,
  } = useQuery(["coinsCurrentPrice", coinIds], () => getCoinPrices(coinIds));

  if (isLoading) {
    return <Loader width={1216} height={300} />;
  }

  if (isError) {
    return <div>Cant get portfolio data </div>;
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <TopCoins />
        {coinPrices ? (
          <PortfolioInfo
            value={totalPortfolioValue}
            coinsData={portfolio}
            coinPrices={coinPrices}
          />
        ) : null}
      </div>
      <Search search={search} handleSearch={handleSearch} />
    </header>
  );
};

export default Header;
