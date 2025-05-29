import { CONSTANTS } from "sea-platform-helpers";

export const verifyJWTRequest = (
  authorization: string | undefined,
  publicKey: Buffer<ArrayBufferLike>,
  verifyJWT: <T extends object = any>(token: string, options?: any) => T
) => {
  let success = true,
    message = "",
    payload: any = undefined;

  if (!authorization) {
    success = false;
    message = "the token is not provided in the authorization request headers";
  }

  authorization = authorization + "";
  let token = authorization;
  if (authorization.startsWith("Bearer ")) token = authorization.substring(7);

  try {
    payload = verifyJWT(token, { publicKey, algorithm: "RS256" });
  } catch (error: any) {
    success = false;
    message = `invalid or expired token (${error.message})`;
  }

  return {
    payload,
    success,
    message,
  };
};

export const validatePermissions = (
  acceptedPermissionKeys: CONSTANTS.Permission.PermissionKeys[],
  accountPermissionKeys: CONSTANTS.Permission.PermissionKeys[],
  validationStrategy: CONSTANTS.Permission.ValidationStrategy
): boolean => {
  switch (validationStrategy) {
    case "all":
      return acceptedPermissionKeys.every((key) =>
        accountPermissionKeys.includes(key)
      );
    case "some":
      return acceptedPermissionKeys.some((key) =>
        accountPermissionKeys.includes(key)
      );
    case "one":
      return (
        acceptedPermissionKeys.length > 0 &&
        accountPermissionKeys.includes(acceptedPermissionKeys[0])
      );
    default:
      return false;
  }
};
