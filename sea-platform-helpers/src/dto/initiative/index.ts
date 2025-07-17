import { IAccount } from "../account";
import { IArrayDataResponse } from "../global";

export type IInitiative = {
    id: string;
    title: string;
    description: string;
    startYear: number;
    endYear: number;
    owner: IAccount;
  };
  
  export interface IInitiativeArrayDataResponse extends IArrayDataResponse<IInitiative> {
    data: IInitiative[];
  }
  
