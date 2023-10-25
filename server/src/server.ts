import { Request, Response, NextFunction } from "express";
import Coin from "./types/coin";

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
    const start = Number(req.query.start || 1);

    const params: Record<string, string | number> = {
      start,
      limit: 120,
      convert: "USD",
    };

    if (req.query.sort) {
      params.sort = req.query.sort.toString();
    }

    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params,
        headers: {
          "X-CMC_PRO_API_KEY": "c2e680cb-90b2-4753-84c7-dd352cdf4554",
        },
      }
    );

    const { data } = response.data;

    const filteredData = data.filter(
      (coin: Coin) => Number(coin.quote.USD.price.toFixed(2)) > 0
    );

    const formattedData: Coin[] = filteredData.map((coin: Coin) => ({
      id: coin.id,
      name: coin.name,
      logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
      symbol: coin.symbol,
      price: coin.quote.USD.price.toFixed(2),
      percentChange24h: coin.quote.USD.percent_change_24h.toFixed(2),
      marketCap: coin.quote.USD.market_cap.toFixed(2),
    }));

    res.json(formattedData);
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error("Error", error.message);
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
