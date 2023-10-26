import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CoinChartProps } from "./CoinChartProps";

const CoinChart: React.FC<CoinChartProps> = ({ data }) => {
  console.log(data.Data.Data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const dataChart = {
    labels: data.Data.Data.map((chartData) => chartData.time),
    datasets: [
      {
        label: "Open",
        data: data.Data.Data.map((chartData) => chartData.open),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Close",
        data: data.Data.Data.map((chartData) => chartData.close),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={dataChart} />
    </div>
  );
};

export default CoinChart;
