"use client";
import React from "react";
import { CONSTANTS } from "sea-platform-helpers";
import NotAuthorized from "../../components/not-authorized";

export interface Props {
  applicationKey: CONSTANTS.Application.ApplicationKeys;
  fallback?: React.ReactNode;
  hasApplicationAccess: (key: CONSTANTS.Application.ApplicationKeys) => boolean;
}

export default function CanAccessApplication<P>(
  WrappedComponent: React.ComponentType<P>,
  {
    applicationKey,
    fallback = (
      <div className="flex items-center justify-center h-screen">
        <NotAuthorized />
      </div>
    ),
    hasApplicationAccess,
  }: Props
) {
  return (props: P) => {
    const canAccess = hasApplicationAccess(applicationKey);
    if (!canAccess) return <>{fallback}</>;

    return <WrappedComponent {...props} />;
  };
}
