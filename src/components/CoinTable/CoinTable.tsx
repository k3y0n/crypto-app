import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICoin } from "../../types/coin";
import Modal from "../../ui/Modal/Modal";
import TableBody from "../TableBody/TableBody";
import TableHeader from "../TableHeader/TableHeader";
import styles from "./CoinTable.module.scss";
import { CoinTableProps } from "./CoinTableProps";

const CoinTable: React.FC<CoinTableProps> = ({
	coins,
	headers,
	sortSettings,
	handleSort,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [coinData, setCoinData] = useState<ICoin>();
	const navigate = useNavigate();

	const handleClick = (id: string) => {
		navigate(`/coin/${id}`);
	};

	const onCloseModal = () => {
		setIsVisible(false);
	};

	return (
		<>
			<table className={styles.coinTable}>
				<TableHeader
					headers={headers}
					sortSettings={sortSettings}
					handleSort={handleSort}
				/>
				<TableBody
					coins={coins}
					handleClick={handleClick}
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					setCoinData={setCoinData}
				/>
			</table>
			{isVisible && coinData && (
				<Modal
					isVisible={isVisible}
					onClose={onCloseModal}
					coinData={coinData}
				/>
			)}
		</>
	);
};

export default CoinTable;
