import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import styles from "./Form.module.scss";
import { FormProps } from "./FormProps";

type CoinData = {
	name: string;
	price: number;
	quantity: number;
};

type FormData = {
	coinName: string;
	quantity: number;
};

const PortfolioForm: React.FC<FormProps> = ({ coinData }) => {
	const [coins, setCoins] = useState<CoinData[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>();

	useEffect(() => {
		const savedCoins = JSON.parse(localStorage.getItem("coins") || "[]");
		setCoins(savedCoins);
	}, []);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const { coinName, quantity } = data;
		const coinPrice = 100;

		const newCoin: CoinData = {
			name: coinName,
			price: coinPrice,
			quantity: quantity,
		};

		setCoins([...coins, newCoin]);
		reset();
	};
	console.log(coinData);

	return (
		<div className={styles["form"]}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles["form-group"]}>
					<label htmlFor="coinName">Название монеты:</label>
					<input
						type="text"
						id="coinName"
						value={coinData.name}
						{...register("coinName", { required: "Это поле обязательное" })}
					/>
					{errors.coinName && <span>{errors.coinName.message}</span>}
				</div>
				<div className={styles["form-group"]}>
					<label htmlFor="quantity">Количество:</label>
					<input
						type="number"
						id="quantity"
						{...register("quantity", {
							required: "Это поле обязательное",
							min: 1,
							max: coinData.max_supply,
						})}
					/>
					{errors.quantity && <span>{errors.quantity.message}</span>}
				</div>
				<Button type="submit">Add</Button>
			</form>
		</div>
	);
};

export default PortfolioForm;
