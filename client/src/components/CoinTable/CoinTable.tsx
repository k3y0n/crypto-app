import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import TableHeader from "../TableHeader/TableHeader";
import styles from "./CoinTable.module.css";
import { CoinTableProps } from "./CoinTableProps";
import { useNavigate } from "react-router-dom";

const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  headers,
  handleSort,
  sortSettings,
}) => {
  const navigate = useNavigate();
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    console.log(`This coin add to your portfolio`);
  };
  const handleClick = (symbol: string) => {
    navigate(`/CoinInfoPage/${symbol}`);
  };
  return (
    <table className={styles.coinTable}>
      <TableHeader
        headers={headers}
        handleSort={handleSort}
        sortSettings={sortSettings}
      />
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id} onClick={() => handleClick(coin.symbol)}>
            <td>{coin.symbol}</td>
            <td>
              <img src={coin.logo} alt={coin.name} />
            </td>
            <td>{coin.price}$</td>
            <td>{coin.marketCap}$</td>
            <td>
              <Badge
                value={coin.percentChange24h}
                color={coin.percentChange24h > 0 ? "green" : "red"}
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
