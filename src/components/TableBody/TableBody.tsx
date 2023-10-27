import { ICoin } from "../../types/coin";
import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import { TableBodyProps } from "./TableBodyProps";

const TableBody: React.FC<TableBodyProps> = ({ coins, handleClick }) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log(`This coin add to your portfolio`);
  };
  return (
    <tbody>
      {coins.map((coin: ICoin) => (
        <tr key={coin.id} onClick={() => handleClick(coin.id)}>
          <td>{coin.symbol.toLocaleUpperCase()}</td>
          <td>
            <img src={coin.image} alt={coin.name} />
          </td>
          <td>{coin.current_price}$</td>
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
  );
};

export default TableBody;
