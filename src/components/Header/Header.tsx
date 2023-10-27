import React from "react";
import Search from "../Search/Search";
import styles from "./Header.module.scss";
import { HeaderProps } from "./HeaderProps";
import TopCoins from "../TopCoins/TopCoins";

const Header: React.FC<HeaderProps> = ({ handleSearch, search }) => {
  return (
    <div className={styles.header}>
      <TopCoins />
      <>
        <Search search={search} handleSearch={handleSearch} />
      </>
    </div>
  );
};

export default Header;
