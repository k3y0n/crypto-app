import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Form.module.scss";
import { FormProps } from "./FormProps";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ICoin } from "../../types";
import Button from "../Button/Button";

type FormData = {
  coinName: string;
  quantity: number;
};

const PortfolioForm = ({ coinData }: FormProps) => {
  const [portfolio, setPortfolio] = useLocalStorage([], "portfolio");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { quantity } = data;
    const totalSum = quantity * coinData.priceUsd;

    const existingItemIndex = portfolio.findIndex(
      (item: ICoin) => item.id === coinData.id
    );

    if (existingItemIndex !== -1) {
      const updatedPortfolio = [...portfolio];
      updatedPortfolio[existingItemIndex].count += Number(quantity);
      updatedPortfolio[existingItemIndex].list.push({
        coins: Number(quantity),
        buyPrice: coinData.priceUsd,
        totalSum,
      });
      setPortfolio(updatedPortfolio);
    } else {
      const newItem = {
        id: coinData.id,
        symbol: coinData.symbol,
        name: coinData.name,
        count: Number(quantity),
        list: [
          {
            coins: Number(quantity),
            buyPrice: coinData.priceUsd,
            totalSum,
          },
        ],
      };

      setPortfolio((prev: ICoin[]) => [...prev, newItem]);
    }

    reset();
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label id="coinName" className={styles.label}>
            Название монеты:
            <input
              className={styles.formInput}
              type="text"
              id={coinData.id}
              value={coinData.name}
              readOnly
              {...register("coinName", { required: "Это поле обязательное" })}
            />
          </label>
          {errors.coinName && <span>{errors.coinName.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label id="quantity" className={styles.label}>
            Количество:
            <input
              className={styles.formInput}
              type="number"
              id="quantity"
              {...register("quantity", {
                required: "Это поле обязательное",
                min: {
                  value: 1,
                  message: "Min 1 coin",
                },
                max: {
                  value: coinData.supply,
                  message: `Max ${coinData.supply} coin`,
                },
              })}
            />
          </label>
          {errors.quantity && <span>{errors.quantity.message}</span>}
        </div>
        <Button type="submit" disabled={!isValid} label={"Add"} />
      </form>
    </div>
  );
};

export default PortfolioForm;
