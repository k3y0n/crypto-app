import Search from "../Search/Search";
import { HeaderProps } from "./HeaderProps";
import styles from "./Header.module.scss";
import TopCoins from "../TopCoins/TopCoins";
import PortfolioInfo from "../PortfolioInfo/PortfolioInfo";
import { useVisibleStorage } from "../../hooks/useVisibleStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Header = ({ handleSearch, search }: HeaderProps) => {
  // const [isVisible, _] = useVisibleStorage("portfolio", false);
  const [portfolio, setPortfolio] = useLocalStorage([], "portfolio");
  console.log("header render");

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <TopCoins />
        {portfolio.length !== 0 && <PortfolioInfo />}
      </div>
      <Search search={search} handleSearch={handleSearch} />
    </header>
  );
};

export default Header;
