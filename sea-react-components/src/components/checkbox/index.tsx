"use client";
import clsx from "clsx";
import React from "react";
import Icon from "../icon";

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<Sizes, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
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
    <label className="relative flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />

      <div
        className={clsx(
          "rounded border-2 peer-checked:bg-primary peer-checked:border-primary peer-disabled:bg-gray-200 peer-disabled:border-gray-200 peer-disabled:cursor-not-allowed flex items-center justify-center transition-all",
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
          <div className="bg-white h-full w-full"></div>
        )}
      </div>
    </label>
  );
}
