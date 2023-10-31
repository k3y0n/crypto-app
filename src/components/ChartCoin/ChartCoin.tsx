import { useState } from "react";
import { useQuery } from "react-query";
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
import { getCoinChart } from "../../lib/api";
import { ChartCoinProps } from "./ChartCoin.Props";
import Loader from "../Loader/Loader";
import styles from "./ChartCoin.module.scss";

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

const ChartCoin: React.FC<ChartCoinProps> = ({ id }) => {
  const [day, setDay] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState("Day");

  const { data, isLoading, isError } = useQuery(["chart", id, day], () =>
    getCoinChart(id, day)
  );

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
        .format(selectedOptions === "Day" ? "HH:MM" : "MM-DD");
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
    setSelectedOptions(e.target.value);
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

  if (isLoading) {
    return <Loader width={1100} height={400} />;
  }

  if (isError) {
    return "Error loading";
  }

  return (
    <>
      <select
        className={styles.select}
        onChange={(e) => handleChange(e)}
        value={selectedOptions}
      >
        <option value="Day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
      </select>
      <div style={{ height: "400px" }}>
        {dataChart && <Line options={options} data={dataChart} />}
      </div>
    </>
  );
};

export default ChartCoin;
