import { IArrayDataResponse } from "../global";

export interface IOrganization {
  id: string;
  name: string;
  accountsCount: number;
}

export interface IOrganizationArrayDataResponse
  extends IArrayDataResponse<IOrganization> {
  data: IOrganization[];
}
