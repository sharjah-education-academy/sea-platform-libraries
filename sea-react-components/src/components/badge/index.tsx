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
    bg: "bg-primary",
    text: "text-primary",
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-secondary",
  },
  success: {
    bg: "bg-success",
    text: "text-success",
  },
  info: {
    bg: "bg-info",
    text: "text-info",
  },
  warning: {
    bg: "bg-warning",
    text: "text-warning",
  },
  error: {
    bg: "bg-error",
    text: "text-error",
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
    theme === "default" ? "text-white" : `${colors[type].text} bg-opacity-20`
  );

  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-3 rounded-lg px-3 py-1",
        className
      )}
    >
      {message}
    </div>
  );
}
