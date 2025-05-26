import clsx from "clsx";
import React from "react";

export type Props = {} & React.HTMLAttributes<HTMLDivElement>;
export default function Paper({
  className = "bg-white",
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx("px-4 py-2 rounded-lg shadow-md", className)}
      {...props}
    >
      {children}
    </div>
  );
}
