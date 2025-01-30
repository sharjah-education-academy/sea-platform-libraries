"use client";
import React from "react";
import { Menu as SMenu, MenuButton, MenuProps } from "@szhsin/react-menu";
import clsx from "clsx";

export type Props = {
  menuButton: React.ReactNode;
  children: React.ReactNode;
  className?: string | undefined;
} & MenuProps;
export default function Menu({
  menuButton,
  children,
  className,
  ...props
}: Props) {
  return (
    <SMenu menuButton={<MenuButton>{menuButton}</MenuButton>} {...props}>
      <div
        className={clsx("sea-bg-white sea-rounded-xl sea-shadow-lg", className)}
      >
        {children}
      </div>
    </SMenu>
  );
}
