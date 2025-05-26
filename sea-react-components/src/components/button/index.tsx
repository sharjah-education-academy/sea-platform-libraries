import clsx from "clsx";
import React from "react";
import { Icon } from "@iconify/react";

export type Props = {
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({
  loading = false,
  disabled,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "px-2 py-1 rounded-lg disabled:bg-gray-200 text-white transition-all duration-300 ease-in-out flex items-center justify-center",
        !loading && !disabled && "hover:bg-opacity-70",
        className ? className : "bg-primary",
        disabled && "bg-gray-300"
      )}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <Icon icon="line-md:loading-loop" className="w-6 h-6" />
      ) : (
        children
      )}
    </button>
  );
}
