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
    <div className="sea-relative sea-flex sea-items-center sea-rounded-lg">
      {showDisplay && (
        <div
          className="sea-w-full sea-h-10 sea-rounded-lg sea-flex sea-items-center sea-justify-center"
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
        className="sea-absolute sea-inset-0 sea-w-full sea-h-full sea-opacity-0 sea-cursor-pointer"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        {...props}
      />
    </div>
  );
}
