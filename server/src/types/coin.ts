interface Coin {
    id: number;
    name: string;
    symbol: string;
    logo:string,
    max_supply:number,
    cmc_rank:number,
    total_supply:number,
    quote:{
      USD:{
        price:number,
        market_cap:number,
        percent_change_24h:number,
      }
    }
  }
  
  export default Coin;
  