"use client";
import Icon from "../icon";
import clsx from "clsx";
import React, { useState } from "react";

export type Types =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error";

export type Themes = "default" | "light";

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

const icons: Record<Types, string> = {
  primary: "gg:info",
  secondary: "gg:info",
  success: "qlementine-icons:success-16",
  info: "gg:info",
  warning: "mi:warning",
  error: "material-symbols:error-outline",
};

export type Props = {
  message: string;
  type: Types;
  theme?: Themes;
  showIcon?: boolean;
  closeButton?: boolean;
  handleClickCloseButton?: (() => void) | undefined;
};
export default function Alert({
  message,
  type,
  closeButton = true,
  showIcon = true,
  theme = "default",
  handleClickCloseButton = undefined,
}: Props) {
  const [open, setOpen] = useState(true);

  let className = colors[type].bg;
  className = clsx(
    className,
    theme === "default" ? "text-white" : `${colors[type].text} bg-opacity-20`
  );

  if (open)
    return (
      <div
        className={clsx("flex items-center gap-3 rounded-lg p-2", className)}
      >
        {showIcon && <Icon icon={icons[type]} className="h-5 w-5" />}

        <p className="flex-1">{message}</p>

        {closeButton && (
          <button
            onClick={() => {
              setOpen(false);
              if (handleClickCloseButton) {
                handleClickCloseButton();
              }
            }}
          >
            <Icon
              icon="line-md:close-small"
              className="h-5 w-5 hover:scale-110 transition-all duration-300 ease-in-out"
            />
          </button>
        )}
      </div>
    );
}
