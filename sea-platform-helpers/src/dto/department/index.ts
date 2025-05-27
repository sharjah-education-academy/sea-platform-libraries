import { IArrayDataResponse } from "../global";
import { IOrganization } from "../organization";

export interface IDepartment {
  id: string;
  name: string;
  organization: IOrganization | undefined;
  accountsCount: number;
}

export interface IDepartmentArrayDataResponse
  extends IArrayDataResponse<IDepartment> {
  data: IDepartment[];
}
