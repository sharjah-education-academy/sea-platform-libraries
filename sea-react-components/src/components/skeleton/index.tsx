import clsx from "clsx";
import React from "react";

export type Props = {} & React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className }: Props) {
  return (
    <div
      className={clsx(
        "sea-bg-gray-300 sea-animate-pulse sea-rounded-md",
        className
      )}
    ></div>
  );
}
