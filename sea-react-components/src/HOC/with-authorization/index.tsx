"use client";
import React from "react";
import { CONSTANTS } from "sea-platform-helpers";
import NotAuthorized from "../../components/not-authorized";

type ValidationStrategy = "all" | "some" | "one";

export interface Props {
  requiredPermissions: string[];
  strategy?: ValidationStrategy;
  fallback?: React.ReactNode;
  hasPermission: (key: CONSTANTS.Permission.PermissionKeys) => boolean;
}

export default function WithAuthorization<P>(
  WrappedComponent: React.ComponentType<P>,
  {
    requiredPermissions,
    strategy = "all",
    fallback = <NotAuthorized />,
    hasPermission,
  }: Props
) {
  return (props: P) => {
    const isAuthorized = validatePermissions(
      requiredPermissions,
      strategy,
      hasPermission
    );

    if (!isAuthorized) return <>{fallback}</>;

    return <WrappedComponent {...props} />;
  };
}

function validatePermissions(
  requiredPermissions: string[],
  strategy: ValidationStrategy,
  hasPermission: (key: string) => boolean
): boolean {
  switch (strategy) {
    case "all":
      return requiredPermissions.every((key) => hasPermission(key));
    case "some":
      return requiredPermissions.some((key) => hasPermission(key));
    case "one":
      return (
        requiredPermissions.length > 0 && hasPermission(requiredPermissions[0])
      );
    default:
      return false;
  }
}
