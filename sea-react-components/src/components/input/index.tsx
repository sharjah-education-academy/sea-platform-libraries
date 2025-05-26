"use client";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import React, { LegacyRef, useState } from "react";

export type Props = {
  ref?: LegacyRef<HTMLInputElement> | undefined;
  errorMessage?: string | boolean;
  start?: React.ReactNode | null;
  end?: React.ReactNode | null;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function Input({
  errorMessage,
  className,
  start = null,
  end = null,
  ref,
  type,
  ...props
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [currentType, setCurrentType] = useState(type);

  if (type === "password") {
    end = (
      <button
        type="button"
        onClick={() => {
          setCurrentType(currentType === "password" ? "text" : "password");
        }}
      >
        <Icon
          icon={
            currentType === "password"
              ? "mdi:eye-outline"
              : "mdi:eye-off-outline"
          }
          className="w-5 h-5 text-primary"
        />
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div
        className={clsx(
          "flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border-0.5 hover:border-primary",
          errorMessage
            ? "border-error"
            : isFocused
            ? "border-primary"
            : "border-gray-200"
        )}
      >
        {start}
        <input
          ref={ref}
          type={currentType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx("outline-none text-text flex-1", className)}
          {...props}
        />
        {end}
      </div>
      {errorMessage && (
        <p className="pl-1 text-sm text-error">{errorMessage}</p>
      )}
    </div>
  );
}
