import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import styles from "./Form.module.scss";
import { FormProps } from "./FormProps";
import { PortfolioItem } from "../../types/portfolio";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type FormData = {
  coinName: string;
  quantity: number;
};

const PortfolioForm: React.FC<FormProps> = ({ coinData }) => {
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
    const totalSum = quantity * coinData.current_price;

    const existingItemIndex = portfolio.findIndex(
      (item: PortfolioItem) => item.id === coinData.id
    );

    if (existingItemIndex !== -1) {
      const updatedPortfolio = [...portfolio];
      updatedPortfolio[existingItemIndex].count += Number(quantity);
      updatedPortfolio[existingItemIndex].list.push({
        coins: Number(quantity),
        buyPrice: coinData.current_price,
        totalSum,
      });
      setPortfolio(updatedPortfolio);
    } else {
      const newItem = {
        id: coinData.id,
        symbol: coinData.symbol,
        image: coinData.image,
        count: Number(quantity),
        list: [
          {
            coins: Number(quantity),
            buyPrice: coinData.current_price,
            totalSum,
          },
        ],
      };

      setPortfolio((prev: PortfolioItem[]) => [...prev, newItem]);
    }

    reset();
  };

  return (
    <div className={styles["form"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-group"]}>
          <label id="coinName">
            Название монеты:
            <input
              type="text"
              id={coinData.id}
              value={coinData.name}
              readOnly
              {...register("coinName", { required: "Это поле обязательное" })}
            />
          </label>
          {errors.coinName && <span>{errors.coinName.message}</span>}
        </div>
        <div className={styles["form-group"]}>
          <label id="quantity">
            Количество:
            <input
              type="number"
              id="quantity"
              {...register("quantity", {
                required: "Это поле обязательное",
                minLength: {
                  value: 1,
                  message: "Min 1 coin",
                },
                maxLength: {
                  value: coinData.max_supply,
                  message: `Max ${coinData.max_supply} coin`,
                },
              })}
            />
          </label>
          {errors.quantity && <span>{errors.quantity.message}</span>}
        </div>
        <Button type="submit" disabled={!isValid}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default PortfolioForm;
