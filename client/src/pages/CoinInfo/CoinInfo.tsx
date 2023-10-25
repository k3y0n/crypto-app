import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "react-query";
import { getCoin } from "../../lib/api";

const CoinInfo = () => {
  const { id } = useParams(); 

  const coin = {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    supply: 1000000,
    priceUSD: 50000,
    marketCapUSD: 50000000000,
    maxSupply: 2000000,
  };

  return (
    <div>
      <h1>{coin.name}</h1>
      <img src=alt={coin.name} />
      
    </div>
  );
};

export default CoinInfo;
