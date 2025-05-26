import { AccountTypes } from "../../constants/account";
import { PermissionKeys } from "../../constants/permission";

export interface IPermission {
  name: string;
  key: PermissionKeys;
  children?: IPermission[] | undefined;
  isLeaf: boolean;
}

export type IPermissionResponse = Record<AccountTypes, IPermission[]>;
