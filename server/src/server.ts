import { Request, Response, NextFunction } from "express";
import Coin from "./types/coin";
import { AxiosError } from "axios";
import { CoinInfo } from "./types/coinInfo";

require("dotenv").config();
const cors = require("cors");

const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.cookie("test", "testValue", {
    sameSite: "none",
    secure: true,
  });
  next();
});

app.get("/api/coinmarketcap", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: 1,
          limit: 120,
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": "d9caffbe-f7a4-48a5-8ec4-8e2f90460a2b",
        },
      }
    );

    const { data } = response.data;

    const filteredData = data.filter((coin: Coin) => {
      const isValid =
        coin.max_supply !== null &&
        coin.total_supply !== null &&
        coin.cmc_rank !== null &&
        coin.quote.USD.price !== null &&
        coin.quote.USD.market_cap !== null;

      return (
        isValid &&
        Number(coin.max_supply.toFixed(2)) > 0 &&
        Number(coin.total_supply.toFixed(2)) > 0 &&
        Number(coin.cmc_rank) > 0 &&
        Number(coin.quote.USD.price.toFixed(2)) > 0 &&
        Number(coin.quote.USD.market_cap.toFixed(2)) > 0
      );
    });

    const formattedData: Coin[] = filteredData.map((coin: Coin) => ({
      id: coin.id,
      name: coin.name,
      logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
      symbol: coin.symbol,
      price: coin.quote.USD.price.toFixed(2),
      percentChange24h: coin.quote.USD.percent_change_24h.toFixed(2),
      marketCap: coin.quote.USD.market_cap.toFixed(2),
      maxSupply: coin.max_supply.toFixed(2),
      rank: coin.cmc_rank,
      totalSupply: coin.total_supply,
    }));

    res.json(formattedData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if ((error as AxiosError).response) {
        console.error((error as AxiosError).response?.data);
        console.error((error as AxiosError).response?.status);
        console.error((error as AxiosError).response?.headers);
      } else if ((error as AxiosError).request) {
        console.error((error as AxiosError).request);
      } else {
        console.error("Error", error.message);
      }
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/coin/:symbol", async (req: Request, res: Response) => {
  const { symbol } = req.params;
  console.log(symbol);

  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?`,
      {
        params: {
          symbol,
        },
        headers: {
          "X-CMC_PRO_API_KEY": "d9caffbe-f7a4-48a5-8ec4-8e2f90460a2b",
        },
      }
    );

    const { data } = response.data;

    if (data && data[symbol] && data[symbol][0]) {
      const coinData = data[symbol][0];
      const formattedData: CoinInfo = {
        id: coinData.id,
        name: coinData.name,
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinData.id}.png`,
        symbol: coinData.symbol,
        price: coinData.quote.USD.price.toFixed(2),
        percentChange24h: coinData.quote.USD.percent_change_24h.toFixed(2),
        marketCap: coinData.quote.USD.market_cap.toFixed(2),
        maxSupply: coinData.max_supply.toFixed(2),
        rank: coinData.cmc_rank,
        totalSupply: coinData.total_supply,
      };
      return res.json(formattedData);
    } else {
      return res.status(404).json({ error: "Coin not found" });
    }
  } catch (error: unknown) {
    if ((error as AxiosError).response) {
      console.error((error as AxiosError).response?.data);
      console.error((error as AxiosError).response?.status);
      console.error((error as AxiosError).response?.headers);
    } else if ((error as AxiosError).request) {
      console.error((error as AxiosError).request);
    } else {
      console.error("Error", (error as Error).message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
