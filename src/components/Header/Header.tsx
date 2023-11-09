import Search from "../Search/Search";
import { HeaderProps } from "./HeaderProps";
import styles from "./Header.module.scss";
import TopCoins from "../TopCoins/TopCoins";
import PortfolioInfo from "../PortfolioInfo/PortfolioInfo";

const Header = ({ handleSearch, search }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <TopCoins />
        {<PortfolioInfo />}
      </div>
      <Search search={search} handleSearch={handleSearch} />
    </header>
  );
};

export default Header;
