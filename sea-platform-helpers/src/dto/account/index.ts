import { ApplicationKeys } from "../../constants/application";
import { PermissionKeys } from "../../constants/permission";
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
  permissionKeys: PermissionKeys[] | undefined;
  applicationKeys: ApplicationKeys[] | undefined;
}

export interface IAccountArrayDataResponse
  extends IArrayDataResponse<IAccount> {
  data: IAccount[];
}

export interface ILoginResponse {
  accessToken: string;
  account: IAccount;
}
