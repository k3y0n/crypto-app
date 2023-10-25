interface Coin {
    id: number;
    name: string;
    symbol: string;
    logo:string,
    quote:{
      USD:{
        price:number,
        market_cap:number,
        percent_change_24h:number,
      }
    }
  }
  
  export default Coin;
  