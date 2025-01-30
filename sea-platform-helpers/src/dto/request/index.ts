import { PermissionKeys } from "../../constants/permission";

export class AuthorizedRequest {
  context:
    | {
        id: string;
        type: string;
        account: object | undefined;
        permissionKeys: PermissionKeys[];
      }
    | undefined;
}
