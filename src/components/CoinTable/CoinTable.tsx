import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICoin } from "../../types/coin";
import Modal from "../../ui/Modal/Modal";
import styles from "./CoinTable.module.scss";
import { CoinTableProps } from "./CoinTableProps";
import { Caret } from "../../ui/Caret/Caret";
import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";

const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  headers,
  sortSettings,
  handleSort,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coinData, setCoinData] = useState<ICoin>();
  const navigate = useNavigate();

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

  return (
    <>
      <table className={styles.coinTable}>
        <thead>
          <tr>
            {headers.map((item) => {
              const isActive = sortSettings.column === item.key;
              const isClickable =
                item.key !== "actions" &&
                item.key !== "symbol" &&
                item.key !== "logo";

              const handleSortClick = () => {
                if (isClickable) {
                  handleSort(item.key);
                }
              };

              return (
                <td key={item.key} onClick={handleSortClick}>
                  {item.label}
                  {isActive && isClickable && (
                    <Caret direction={sortSettings.direction} active={true} />
                  )}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {coins.map((coin: ICoin) => (
            <tr key={coin.id} onClick={() => handleClick(coin.id)}>
              <td>{coin.symbol.toLocaleUpperCase()}</td>
              <td>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={coin.image} alt={coin.name} />
                  {coin.name}
                </span>
              </td>
              <td>{coin.current_price}$</td>
              <td>{coin.market_cap}$</td>
              <td>
                <Badge
                  value={Number(coin.price_change_percentage_24h.toFixed(2))+'%'}
                  color={coin.price_change_percentage_24h > 0 ? "green" : "red"}
                />
              </td>
              <td>
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
