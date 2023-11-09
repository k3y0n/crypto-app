import { ICoin } from "../../types/coin";

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedComponent: string;
  coinData?: ICoin;
}
