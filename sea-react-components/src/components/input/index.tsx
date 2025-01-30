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
          className="sea-w-5 sea-h-5 sea-text-primary"
        />
      </button>
    );
  }

  return (
    <div className="sea-flex sea-flex-col sea-gap-1">
      <div
        className={clsx(
          "sea-flex sea-items-center sea-justify-between sea-gap-2 sea-bg-white sea-px-3 sea-py-2 sea-rounded-xl sea-border-0.5 hover:sea-border-primary",
          errorMessage
            ? "sea-border-error"
            : isFocused
            ? "sea-border-primary"
            : "sea-border-gray-200"
        )}
      >
        {start}
        <input
          ref={ref}
          type={currentType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            "sea-outline-none sea-text-text sea-flex-1",
            className
          )}
          {...props}
        />
        {end}
      </div>
      {errorMessage && (
        <p className="sea-pl-1 sea-text-sm sea-text-error">{errorMessage}</p>
      )}
    </div>
  );
}
