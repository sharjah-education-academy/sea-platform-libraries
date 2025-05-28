import { IDepartment } from "../department";
import { IArrayDataResponse } from "../global";
import { IOrganization } from "../organization";
import { IRoleShort } from "../role";

export interface IAccount {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  isLocked: boolean;
  roles: IRoleShort[];
  organization: IOrganization | undefined;
  department: IDepartment | undefined;
}

export interface IAccountArrayDataResponse
  extends IArrayDataResponse<IAccount> {
  data: IAccount[];
}
