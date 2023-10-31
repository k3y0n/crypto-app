import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { ICoin } from "../../types/coin";
import Button from "../../ui/Button/Button";
import styles from "./PortfolioTable.module.scss";

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
                <td>{coin.symbol.toUpperCase()}</td>
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

                <td>{coin.count}</td>
                <td>
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
