import { ApplicationKeys } from "../../constants/application";
import { PermissionKeys } from "../../constants/permission";

export interface IPermission {
  applicationKey: ApplicationKeys;
  name: string;
  key: PermissionKeys;
  children?: IPermission[] | undefined;
  isLeaf: boolean;
}
