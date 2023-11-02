import Search from "../Search/Search";
import { HeaderProps } from "./HeaderProps";
import styles from "./Header.module.scss";

const Header = ({ handleSearch, search }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__top}></div>
      <Search search={search} handleSearch={handleSearch} />
    </header>
  );
};

export default Header;
