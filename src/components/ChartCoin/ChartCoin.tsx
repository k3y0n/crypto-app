import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment";
import { ChartCoinProps } from "./ChartCoin.Props";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartCoin: React.FC<ChartCoinProps> = ({
  data,
  currentOptions,
  setOptions,
  setDay,
}) => {
  
  type ChartOptionsWithPointStyle = Partial<
    ChartOptions<"line"> & { pointStyle: boolean }
  >;

  const options: ChartOptionsWithPointStyle = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    pointStyle: false,
    maintainAspectRatio: false,
  };

  const labels =
    data?.prices?.map((item: [number, number]) => {
      return moment
        .unix(item[0] / 1000)
        .format(currentOptions === "Day" ? "HH:MM" : "MM-DD");
    }) ?? [];

  const dataChart: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        data:
          data?.prices?.map((item: [number, number]) => {
            return item[1];
          }) ?? [],
        borderColor: "rgb(0, 0, 100)",
        backgroundColor: "rgba(0, 99, 132, 0.5)",
      },
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions(e.target.value);
    switch (e.target.value) {
      case "Day":
        setDay(1);
        break;
      case "Week":
        setDay(7);
        break;
      case "Month":
        setDay(30);
        break;
    }
  };

  return (
    <>
      <select onChange={(e) => handleChange(e)} value={currentOptions}>
        <option value="Day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
      </select>
      <div>{dataChart && <Line options={options} data={dataChart} />}</div>
    </>
  );
};

export default ChartCoin;
