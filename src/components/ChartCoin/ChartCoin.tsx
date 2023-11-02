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
import { IChart } from "../../types/chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartOptionsWithPointStyle = Partial<
  ChartOptions<"line"> & { pointStyle: boolean }
>;

const ChartCoin: React.FC<ChartCoinProps> = ({ data, selectedOptions }) => {
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

  console.log(data);

  const labels =
    data?.map((item: IChart) => {
      return moment
        .unix(item.time / 1000 / 1000)
        .format(selectedOptions === "Day" ? "HH:mm" : "MM-DD");
    }) ?? [];

    console.log(labels);

  const dataChart: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        data:
          data?.map((item: IChart) => {
            return item.priceUsd;
          }) ?? [],
        borderColor: "rgb(0, 0, 100)",
        backgroundColor: "rgba(0, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <div style={{ height: "400px" }}>
        {dataChart && <Line options={options} data={dataChart} />}
      </div>
    </>
  );
};

export default ChartCoin;
