import clsx from "clsx";
import React from "react";

export type Types =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error";

const colors: Record<
  Types,
  {
    bg: string;
    text: string;
  }
> = {
  primary: {
    bg: "sea-bg-primary",
    text: "sea-text-primary",
  },
  secondary: {
    bg: "sea-bg-secondary",
    text: "sea-text-secondary",
  },
  success: {
    bg: "sea-bg-success",
    text: "sea-text-success",
  },
  info: {
    bg: "sea-bg-info",
    text: "sea-text-info",
  },
  warning: {
    bg: "sea-bg-warning",
    text: "sea-text-warning",
  },
  error: {
    bg: "sea-bg-error",
    text: "sea-text-error",
  },
};

export type Props = {
  message: string;
  type: Types;
  theme?: "default" | "light";
};
export default function Badge({ message, type, theme = "default" }: Props) {
  let className = colors[type].bg;
  className = clsx(
    className,
    theme === "default"
      ? "sea-text-white"
      : `${colors[type].text} sea-bg-opacity-20`
  );

  return (
    <div
      className={clsx(
        "sea-flex sea-items-center sea-justify-center sea-gap-3 sea-rounded-lg sea-px-3 sea-py-1",
        className
      )}
    >
      {message}
    </div>
  );
}
