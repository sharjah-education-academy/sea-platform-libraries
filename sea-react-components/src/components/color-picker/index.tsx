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
  className = "",
  style,
  ...props
}: Props) {
  return (
    <label
      className={`relative inline-block overflow-hidden ${className}`}
      style={style}
    >
      {/* Visible color swatch or display */}
      {showDisplay && (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            backgroundColor: color,
            color: isColorLight(color) ? "#000000" : "#FFFFFF",
            borderRadius: "inherit",
          }}
        >
          <p className="text-xs">{color}</p>
        </div>
      )}

      {/* Hidden color input */}
      <input
        type="color"
        className="absolute inset-0 w-full h-full opacity-0 appearance-none cursor-pointer"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        {...props}
      />
    </label>
  );
}
