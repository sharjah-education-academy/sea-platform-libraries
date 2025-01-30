"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
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
    theme === "default"
      ? "sea-text-white"
      : `${colors[type].text} sea-bg-opacity-20`
  );

  if (open)
    return (
      <div
        className={clsx(
          "sea-flex sea-items-center sea-gap-3 sea-rounded-lg sea-p-2",
          className
        )}
      >
        {showIcon && <Icon icon={icons[type]} className="sea-h-5 sea-w-5" />}

        <p className="sea-flex-1">{message}</p>

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
              className="sea-h-5 sea-w-5 hover:sea-scale-110 sea-transition-all sea-duration-300 sea-ease-in-out"
            />
          </button>
        )}
      </div>
    );
}
