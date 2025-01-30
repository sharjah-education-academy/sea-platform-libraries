import clsx from "clsx";
import React from "react";

export type Props = {} & React.HTMLAttributes<HTMLDivElement>;
export default function Paper({
  className = "sea-bg-white",
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        "sea-px-4 sea-py-2 sea-rounded-lg sea-shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
