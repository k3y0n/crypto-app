import { ICoin } from "../../types/coin";

export interface ModalProps {
	isVisible: boolean;
	coinData: ICoin;
	onClose: () => void;
}
