import { SetMetadata } from "@nestjs/common";
import { CONSTANTS } from "sea-platform-helpers";

export const Permissions = (
  keys: CONSTANTS.Permission.PermissionKeys[],
  strategy: "all" | "some" | "one" = "all"
) => {
  return (
    SetMetadata("permissions", keys) &&
    SetMetadata("permissionStrategy", strategy)
  );
};
