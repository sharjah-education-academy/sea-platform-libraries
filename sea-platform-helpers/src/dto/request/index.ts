import { ApplicationKeys } from "../../constants/application";
import { PermissionKeys } from "../../constants/permission";

export class AuthorizedRequest {
  context:
    | {
        id: string;
        type: string;
        account: object | undefined;
        permissionKeys: PermissionKeys[];
        applicationKeys: ApplicationKeys[];
      }
    | undefined;
}
