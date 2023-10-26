import { useState, useEffect } from "react";
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
import type { ChartData,ChartOptions  } from "chart.js";
import { CoinChartData } from "../../types/chart";
import moment from "moment";
import { CoinChartProps } from "./CoinChartProps";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const CoinChart: React.FC<CoinChartProps> = ({ coinChart, onSetDay }) => {
  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
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
  });

  useEffect(() => {
  console.log(coinChart);

    setData({
      labels: coinChart.map((price: number[]) => {
        return price[0];
      }),
      datasets: [
        {
          label: "Dataset 1",
          data: coinChart.map((price: number[]) => {
            return price[1];
          }),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "day":
        onSetDay(1);
        break;
      case "week":
        onSetDay(7);
        break;
      case "month":
        onSetDay(30);
        break;
    }
    setData({
      labels: coinChart.map((price: number[]) => {
        return price[0];
      }),
      datasets: [
        {
          label: "Dataset 1",
          data: coinChart.map((price: number[]) => {
            return price[1];
          }),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
    return (
      <>
        <select onChange={(e) => handleChange(e)}>
          <option value="day">День</option>
          <option value="week">Неделя</option>
          <option value="month">Месяц</option>
        </select>
        {data ? <Line options={options} data={data} /> : null}
      </>
    );
  };
};

export default CoinChart;
