import { ICoin } from "../../types/coin";

export interface TableBodyProps {
	coins: ICoin[];
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	handleClick: (id: string) => void;
	setCoinData: (coin: ICoin) => void;
}
