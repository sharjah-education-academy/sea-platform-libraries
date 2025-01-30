"use client";
import clsx from "clsx";
import React, { LegacyRef, useState } from "react";

export type Props = {
  ref?: LegacyRef<HTMLTextAreaElement> | undefined;
  errorMessage?: string | boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export default function Textarea({
  errorMessage,
  className,
  ref,
  ...props
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

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
        <textarea
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            "sea-outline-none sea-text-text sea-flex-1",
            className
          )}
          {...props}
        />
      </div>
      {errorMessage && (
        <p className="sea-pl-1 sea-text-sm sea-text-error">{errorMessage}</p>
      )}
    </div>
  );
}
