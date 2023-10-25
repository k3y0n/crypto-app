import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import styles from "./CoinTable.module.css";
import { CoinTableProps } from "./CoinTableProps";

const CoinTable: React.FC<CoinTableProps> = ({ coins }) => {
  const handleClick = () => {
    console.log(`This coin add to your portfolio`);
  };
  return (
    <table className={styles.coinTable}>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Logo</th>
          <th>Price (USD)</th>
          <th>Market Cap</th>
          <th>Change (24h)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.symbol}</td>
            <td>
              <img src={coin.logo} alt={coin.name} />
            </td>
            <td>{coin.price}</td>
            <td>{coin.marketCap}</td>
            <td>
              {
                <Badge
                  value={coin.percentChange24h}
                  color={coin.percentChange24h > 0 ? "green" : "red"}
                />
              }
            </td>
            <td>
              <Button label={"Add"} onClick={handleClick} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
