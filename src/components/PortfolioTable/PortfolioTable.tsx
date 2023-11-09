import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { ICoin } from "../../types/coin";
import styles from "./PortfolioTable.module.scss";
import Button from "../Button/Button";

const PortfolioTable = () => {
  const headers = [
    { key: "symbol", label: "Symbol" },
    { key: "coin", label: "Coin" },
    { key: "total", label: "Total" },
    { key: "actions", label: "Delete" },
  ];
  const [portfolio, setPortfolio] = useLocalStorage([], "portfolio");
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();

    const updatedPortfolio = portfolio.filter((item: ICoin) => item.id !== id);

    setPortfolio(updatedPortfolio);
  };

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/coin/${id}`);
  };

  return (
    <>
      {portfolio.length ? (
        <table className={styles.coinTable}>
          <thead>
            <tr>
              {headers.map((item) => (
                <td key={item.key}>{item.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {portfolio.map((coin: ICoin) => (
              <tr onClick={(e) => handleClick(e, coin.id)} key={coin.id}>
                <td data-label="symbol">{coin.symbol.toUpperCase()}</td>
                <td data-label="coin">
                  <img
                    src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                    alt={coin.name}
                  />
                </td>
                <td data-label="total">{coin.count}</td>
                <td data-label="actions">
                  <Button
                    label={"Delete coin"}
                    onClick={(e) => handleDelete(e, coin.id)}
                    className={"button-delete"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Empty</div>
      )}
    </>
  );
};

export default PortfolioTable;
