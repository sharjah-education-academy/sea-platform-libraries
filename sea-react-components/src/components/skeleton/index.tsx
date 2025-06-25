import clsx from "clsx";
import React from "react";

export type Props = {} & React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: Props) {
  return (
    <div
      className={clsx("bg-gray-300 animate-pulse rounded-md", className)}
      {...props}
    ></div>
  );
}
