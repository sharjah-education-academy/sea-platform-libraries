"use client";
import React, { useRef, useState } from "react";
import Input from "../input";

export type Props = {
  length: number;
  onChange: (otpCode: string) => void;
  errorMessage?: string;
};

export default function OTPInput({ length, onChange, errorMessage }: Props) {
  const [otpParts, setOTPParts] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeOTPPart = (value: string, index: number) => {
    const updatedOTPParts = [...otpParts];
    updatedOTPParts[index] = value;
    setOTPParts(updatedOTPParts);
    onChange(updatedOTPParts.join(""));

    // Move focus to the next input if the value is entered and not at the last input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="sea-flex sea-flex-col sea-gap-2">
      <div className="sea-flex sea-items-center sea-gap-5">
        {otpParts.map((p, i) => {
          return (
            <Input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              key={`part-${i}`}
              id={`part-${i}`}
              name={`part-${i}`}
              placeholder="*"
              className="sea-w-10 sea-h-10 sea-text-center sea-text-3xl"
              maxLength={1}
              value={p}
              onKeyDown={(e) => {
                // Prevent space and handle backspace
                if (e.key === " " || e.key === "Spacebar") {
                  e.preventDefault();
                }
                if (e.key === "Backspace" && otpParts[i] === "" && i > 0) {
                  inputRefs.current[i - 1]?.focus();
                }
              }}
              onChange={(e) => {
                handleChangeOTPPart(e.target.value, i);
              }}
              errorMessage={Boolean(errorMessage)}
            />
          );
        })}
      </div>

      {errorMessage && (
        <p className="sea-pl-1 sea-text-sm sea-text-error">{errorMessage}</p>
      )}
    </div>
  );
}
