import { Organization } from "..";
import { IArrayDataResponse } from "../global";

export interface IGoal {
  id: string;
  title: string;
  description: string;
  organization?: Organization.IOrganization;
  startYear: number;
  endYear: number;
}

export interface IGoalArrayDataResponse extends IArrayDataResponse<IGoal> {
  data: IGoal[];
}
