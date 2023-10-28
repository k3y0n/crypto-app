import { ICoin } from "../../types/coin";
import { PortfolioItem } from "../../types/portfolio";

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedComponent: string;
  coinData?: ICoin;
  portfolioData?: PortfolioItem[];
}
