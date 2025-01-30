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
        "sea-px-2 sea-py-1 sea-rounded-lg disabled:sea-bg-gray-200 sea-text-white sea-transition-all sea-duration-300 sea-ease-in-out sea-flex sea-items-center sea-justify-center",
        !loading && !disabled && "hover:sea-bg-opacity-70",
        className ? className : "sea-bg-primary",
        disabled && "sea-bg-gray-300"
      )}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <Icon icon="line-md:loading-loop" className="sea-w-6 sea-h-6" />
      ) : (
        children
      )}
    </button>
  );
}
