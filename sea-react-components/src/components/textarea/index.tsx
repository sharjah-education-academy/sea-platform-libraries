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
        <textarea
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx("outline-none text-text flex-1", className)}
          {...props}
        />
      </div>
      {errorMessage && (
        <p className="pl-1 text-sm text-error">{errorMessage}</p>
      )}
    </div>
  );
}
