"use client";
import clsx from "clsx";
import React from "react";
import Icon from "../icon";

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<Sizes, string> = {
  xs: "sea-w-3 sea-h-3",
  sm: "sea-w-4 sea-h-4",
  md: "sea-w-5 sea-h-5",
  lg: "sea-w-6 sea-h-6",
  xl: "sea-w-7 sea-h-7",
};

export type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: Sizes;
  className?: string | undefined;
  semiChecked?: boolean;
};
export default function Checkbox({
  checked,
  onChange,
  disabled = false,
  size = "md",
  semiChecked = false,
  className,
}: Props) {
  const sizeClass = sizeClasses[size];
  return (
    <label className="sea-relative sea-flex sea-items-center sea-cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sea-sr-only sea-peer"
      />

      <div
        className={clsx(
          "sea-rounded sea-border-2 peer-checked:sea-bg-primary peer-checked:sea-border-primary peer-disabled:sea-bg-gray-200 peer-disabled:sea-border-gray-200 peer-disabled:sea-cursor-not-allowed sea-flex sea-items-center sea-justify-center sea-transition-all",
          sizeClass
        )}
      >
        {checked ? (
          semiChecked ? (
            <Icon icon="octicon:dash-16" className="text-white" />
          ) : (
            <Icon
              icon="material-symbols:check-rounded"
              className="text-white"
            />
          )
        ) : (
          <div className="sea-bg-white sea-h-full sea-w-full"></div>
        )}
      </div>
    </label>
  );
}
