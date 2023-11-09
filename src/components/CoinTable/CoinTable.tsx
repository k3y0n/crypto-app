import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ICoin } from "../../types";
import { CoinTableProps } from "./CoinTableProps";

import { SortSettings } from "../../types";
import _ from "lodash";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./CoinTable.module.scss";
import Button from "../Button/Button";
import { Caret } from "../Caret/Caret";
import Modal from "../Modal/Modal";
import Badge from "../Badge/Badge";

const CoinTable = ({ coins }: CoinTableProps) => {
  const [sortSettings, setSortSettings] = useState<SortSettings>({
    column: "",
    direction: "asc",
  });
  const [coinData, setCoinData] = useState<ICoin>();
  const [activeSort, setActiveSort] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const isActive = sortSettings.column === activeSort;
  const headers = [
    { key: "symbol", label: "Symbol" },
    { key: "logo", label: "Logo Coin" },
    { key: "priceUsd", label: "Price in (USD)" },
    { key: "marketCap", label: "Market Cap" },
    { key: "changePercent24Hr", label: "Change 24h%" },
    { key: "action", label: "Action" },
  ];

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    coin: ICoin
  ) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
    setCoinData(coin);
  };

  const handleClick = (id: string) => {
    navigate(`/coin/${id}`);
  };

  const onCloseModal = () => {
    setIsVisible(false);
  };

  const isClickable = (col: string) => {
    switch (col) {
      case "priceUsd":
        return true;
      case "marketCap":
        return true;
      case "changePercent24Hr":
        return true;
    }
  };

  const handleSortClick = (item: string) => {
    if (isClickable(item)) {
      setActiveSort(item);
      setSortSettings((prevSettings) => {
        if (activeSort === prevSettings.column) {
          return {
            column: item,
            direction: prevSettings.direction === "asc" ? "desc" : "asc",
          };
        }
        return { ...prevSettings, item };
      });
    }
  };

  const sortedCoins = useMemo(() => {
    return sortSettings.direction === "asc"
      ? _.sortBy(coins, sortSettings.column)
      : _.sortBy(coins, sortSettings.column).reverse();
  }, [coins, sortSettings.column, sortSettings.direction]);

  return (
    <>
      <table className={styles.coinTable}>
        <thead>
          <tr>
            {headers.map((item) => (
              <td key={item.key} onClick={() => handleSortClick(item.key)}>
                {item.label}
                {isActive && item.key === activeSort && (
                  <Caret direction={sortSettings.direction} />
                )}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin: ICoin) => (
            <tr key={coin.id} onClick={() => handleClick(coin.id)}>
              <td data-label="Symbol">{coin.symbol.toLocaleUpperCase()}</td>
              <td data-label="Logo Coin">
                <img
                  src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                  alt={coin.name}
                />
              </td>
              <td data-label="Price in (USD)">{formatPrice(coin.priceUsd)}$</td>
              <td data-label="Market Cap">{formatPrice(coin.marketCapUsd)}$</td>
              <td data-label="Change 24h%">
                <Badge
                  value={`${formatPrice(coin.changePercent24Hr)}%`}
                  color={`${coin.changePercent24Hr > 0 ? "green" : "red"}`}
                />
              </td>
              <td data-label="Action">
                <Button
                  label={"Add"}
                  onClick={(e) => handleButtonClick(e, coin)}
                  className={"button-add"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isVisible && coinData && (
        <Modal
          isVisible={isVisible}
          onClose={onCloseModal}
          selectedComponent={"Form"}
          coinData={coinData}
        />
      )}
    </>
  );
};

export default CoinTable;
