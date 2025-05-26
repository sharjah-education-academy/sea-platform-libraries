import clsx from "clsx";
import React from "react";

export type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};
export default function Toggle({ checked, onChange, label, disabled }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className="flex items-center space-x-3 cursor-pointer select-none">
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <div
          className={clsx(
            "block w-10 h-6 rounded-full transition",
            disabled
              ? "bg-gray-300"
              : checked
              ? "bg-primary"
              : "bg-primary bg-opacity-40"
          )}
        ></div>
        <div
          className={clsx(
            "absolute top-1 left-1 h-4 w-4 bg-white rounded-full transition",
            checked ? "translate-x-4" : ""
          )}
        ></div>
      </div>
    </label>
  );
}
