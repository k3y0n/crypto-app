import { CoinChartData } from "../../types/chart";

export interface CoinChartProps {
  coinChart: CoinChartData;
  onSetDay: (d: number) => void;
}
