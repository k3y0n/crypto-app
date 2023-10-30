import { IChart } from "../../types/chart";

export interface ChartCoinProps {
  data: IChart;
  currentOptions: string;
  setDay: (day: number) => void;
  setOptions: (oprtions: string) => void;
}
