import TableBody from "../TableBody/TableBody";
import TableHeader from "../TableHeader/TableHeader";
import styles from "./CoinTable.module.scss";
import { CoinTableProps } from "./CoinTableProps";
import { useNavigate } from "react-router-dom";

const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  headers,
  sortSettings,
  handleSort,
}) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/coin/${id}`);
  };

  return (
    <table className={styles.coinTable}>
      <TableHeader
        headers={headers}
        sortSettings={sortSettings}
        handleSort={handleSort}
      />
      <TableBody coins={coins} handleClick={handleClick} />
    </table>
  );
};

export default CoinTable;
