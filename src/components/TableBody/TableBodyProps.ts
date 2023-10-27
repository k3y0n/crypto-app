import { ICoin } from "../../types/coin";

export interface TableBodyProps{
    coins:ICoin[],
    handleClick:(id:string) => void;
}