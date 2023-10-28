import { PortfolioItem } from "../../types/portfolio";
import Button from "../../ui/Button/Button";
import { PortfolioTableProps } from "./PortfolioTableProps";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./PortfolioTable.module.scss";
import { useNavigate } from "react-router-dom";

const PortfolioTable: React.FC<PortfolioTableProps> = ({ coins }) => {
  const [portfolio, setPortfolio] = useLocalStorage([], "portfolio");
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();

    const updatedPortfolio = portfolio.filter(
      (item: PortfolioItem) => item.id !== id
    );

    setPortfolio(updatedPortfolio);
  };

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    navigate(`/coin/${id}`);
  };

  return (
    <>
      <h2>My Coins</h2>
      {coins ? (
        <table className={styles.coinTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Logo</th>
              <th>Symbol</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin: PortfolioItem) => (
              <tr onClick={(e) => handleClick(e, coin.id)} key={coin.id}>
                <td>{coin.id.toUpperCase()}</td>
                <td>
                  <img src={coin.image} alt={coin.symbol} />
                </td>
                <td>{coin.symbol.toUpperCase()}</td>

                <td>{coin.count}</td>
                <td>
                  <Button
                    label={"Delet coin"}
                    onClick={(e) => handleDelete(e, coin.id)}
                    className={"button-delete"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No coins available"
      )}
    </>
  );
};

export default PortfolioTable;
