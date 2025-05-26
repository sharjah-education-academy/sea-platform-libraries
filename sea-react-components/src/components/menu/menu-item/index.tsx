"use client";
import clsx from "clsx";
import React from "react";
import { MenuItem as SMenuItem } from "@szhsin/react-menu";
export type Props = {
  key: string;
  children: React.ReactNode;
  className?: string | undefined;
  selected?: boolean;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export default function MenuItem({
  children,
  className,
  selected = false,
  disabled = false,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        "rounded-md transition-all duration-300 ease-in-out",
        selected && "bg-primary",
        !disabled ? "hover:bg-primary hover:bg-opacity-50" : "bg-gray-200",
        className
      )}
      {...props}
    >
      <SMenuItem disabled={disabled}>{children}</SMenuItem>
    </div>
  );
}
