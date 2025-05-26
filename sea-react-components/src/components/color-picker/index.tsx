"use client";
import React from "react";
import { isColorLight } from "../../utils/color";

export type Props = {
  color: string;
  setColor: (newColor: string) => void;
  showDisplay?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function ColorPicker({
  color,
  setColor,
  showDisplay = true,
  ...props
}: Props) {
  return (
    <div className="relative flex items-center rounded-lg">
      {showDisplay && (
        <div
          className="w-full h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: color,
            color: isColorLight(color) ? "#000000" : "#FFFFFF",
          }}
        >
          <p>{color}</p>
        </div>
      )}

      {/* Hidden color input */}
      <input
        type="color"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        {...props}
      />
    </div>
  );
}
