import React from "react";
import Search from "../Search/Search";
import styles from "./Header.module.css";
import { HeaderProps } from "./HeaderPropts";

const Header: React.FC<HeaderProps> = ({ handleSearch, search }) => {
  return (
    <div className={styles.header}>
      <Search search={search} handleSearch={handleSearch} />
    </div>
  );
};

export default Header;
