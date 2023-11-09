import Search from "../Search/Search";
import { HeaderProps } from "./HeaderProps";
import styles from "./Header.module.scss";
import TopCoins from "../TopCoins/TopCoins";
import PortfolioInfo from "../PortfolioInfo/PortfolioInfo";
import { useEffect, useState } from "react";

function getCoins() {
  const coins = localStorage.getItem("portfolio");

  if (typeof coins === "string") {
    const items = JSON.parse(coins);
    return items;
  } else {
    return [];
  }
}

const Header = ({ handleSearch, search }: HeaderProps) => {
  const [coins, setCoins] = useState(getCoins);

  const checkPortfolio = () => {
    const items = window.localStorage.getItem("portfolio");
    if (items && items.length > 0) {
      setCoins(JSON.parse(items));
    } else {
      setCoins([]);
    }
    return () => window.removeEventListener("storage", () => {});
  };

  useEffect(() => {
    window.addEventListener("storage", checkPortfolio);
    return () => window.removeEventListener("storage", checkPortfolio);
  }, [coins]);

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <TopCoins />
        {coins.length > 0 && <PortfolioInfo coins={coins}/>}
      </div>
      <Search search={search} handleSearch={handleSearch} />
    </header>
  );
};

export default Header;
