import type { ChartData, ChartOptions } from "chart.js";
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
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getCoin, getCoinChart } from "../../lib/api";
import Button from "../../ui/Button/Button";
import styles from "./CoinPage.module.scss";
import Modal from "../../ui/Modal/Modal";
import { ICoin } from "../../types/coin";
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

const CoinPage = () => {
  const { id } = useParams() as { id: string };

  const [day, setDay] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("Day");
  const { data, isFetching, isError } = useQuery(["chart", id, day], () =>
    getCoinChart(id, day)
  );

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const onCloseModal = () => {
    setIsVisible(!isVisible);
  };

  const coinData = useQuery(["coin", id], () => getCoin(id));

  if (isFetching) {
    return "Loading...";
  }

  if (isError) {
    return "Error loading";
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${id?.toLocaleUpperCase()} Line Chart`,
      },
    },
  };

  const dataChart: ChartData<"line"> = {
    labels: data?.prices.map((item: IChart[]) => {
      return moment
        .unix(item[0] / 1000)
        .format(selectedOptions === "Day" ? "HH:MM" : "MM-DD");
    }),
    datasets: [
      {
        label: `${id?.toLocaleUpperCase()}`,
        data: data?.prices.map((item: number[]) => {
          return item[1];
        }),
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

  let coin: ICoin | undefined = undefined;

  if (coinData.status === "success" && Array.isArray(coinData.data)) {
    coin = coinData.data[0];
  }

  return (
    <div className={styles.coinPageContainer}>
      <Link to="/" className={styles.back}>
        Back to Table
      </Link>
      {coin && (
        <div className={styles.coinInfo}>
          <p className={styles.coinHeader}>
            <img src={coin.image} alt={coin.name} />
            <span id={coin.id.toString()}>{coin.name}</span>
          </p>
          <div className={styles.coinInfoBody}>
            <div>
              <p>Symbol: {coin.symbol}</p>
              <p>Rank: {coin.market_cap_rank}</p>
              <p>Supply: {coin.total_supply}</p>
            </div>
            <div>
              <p>Price: {coin.current_price}$</p>
              <p>Market Cap: {coin.market_cap}$</p>
              <p>Max Supply: {coin.max_supply}</p>
            </div>
          </div>
          <Button onClick={handleClick}>Add Coins</Button>
        </div>
      )}
      <select
        className={styles.select}
        onChange={(e) => handleChange(e)}
        value={selectedOptions}
      >
        <option value="Day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
      </select>
      <div className={styles.chartContainer}>
        {dataChart && <Line options={options} data={dataChart} />}
      </div>
      {isVisible && coin && (
        <Modal isVisible={isVisible} onClose={onCloseModal} coinData={coin} />
      )}
    </div>
  );
};

export default CoinPage;
