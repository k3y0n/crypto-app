import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import TableHeader from "../TableHeader/TableHeader";
import styles from "./CoinTable.module.css";
import { CoinTableProps } from "./CoinTableProps";
import { useNavigate } from "react-router-dom";

const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  headers,
  sortSettings,
  handleSort,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log(`This coin add to your portfolio`);
  };

  const handleClick = (id: string) => {
    navigate(`/coinInfoPage/${id}`);
  };

  return (
    <table className={styles.coinTable}>
      <TableHeader
        headers={headers}
        sortSettings={sortSettings}
        handleSort={handleSort}
      />
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id} onClick={() => handleClick(coin.id)}>
            <td>{coin.symbol.toLocaleUpperCase()}</td>
            <td>
              <img src={coin.image} alt={coin.name} />
            </td>
            <td>{Number(coin.current_price.toFixed(2))}$</td>
            <td>{coin.market_cap}$</td>
            <td>
              <Badge
                value={Number(coin.price_change_percentage_24h.toFixed(2))}
                color={coin.price_change_percentage_24h > 0 ? "green" : "red"}
              />
            </td>
            <td>
              <Button
                label={"Add"}
                onClick={handleButtonClick}
                className={"button-add"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
