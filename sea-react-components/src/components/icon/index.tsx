import React from "react";
import { Icon as I, IconifyIcon } from "@iconify/react";

export type Props = {
  icon: string | IconifyIcon;
  className?: string | undefined;
};
export default function Icon({ icon, className }: Props) {
  return <I icon={icon} className={className} />;
}
