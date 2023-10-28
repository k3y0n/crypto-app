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
	const { id } = useParams<string>();
	const [day, setDay] = useState(1);
	const [selectedOptions, setSelectedOptions] = useState("Day");
	const { data, isFetching, isError } = useQuery(["chart", id, day], () =>
		getCoinChart(id, day)
	);

	const handleClick = () => {};

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
		labels: data?.prices.map((item: number[]) => {
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

	return (
		<div className={styles.coinPageContainer}>
			<Link to="/" className={styles.back}>
				Back to Table
			</Link>
			{coinData && (
				<div className={styles.coinInfo}>
					<p className={styles.coinHeader}>
						<img src={coinData?.data[0].image} alt={coinData?.data[0].name} />
						<h1 id={coinData?.data[0].id.toString()}>
							{coinData?.data[0].name}
						</h1>
					</p>
					<div className={styles.coinInfoBody}>
						<p>
							<p>Symbol: {coinData?.data[0].symbol}</p>
							<p>Rank: {coinData?.data[0].market_cap_rank}</p>
							<p>Supply: {coinData?.data[0].total_supply}</p>
						</p>
						<p>
							<p>Price: {coinData?.data[0].current_price}$</p>
							<p>Market Cap: {coinData?.data[0].market_cap}$</p>
							<p>Max Supply: {coinData?.data[0].max_supply}</p>
						</p>
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
		</div>
	);
};

export default CoinPage;
