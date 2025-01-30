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
    <label className="sea-flex sea-items-center sea-space-x-3 sea-cursor-pointer sea-select-none">
      {label && (
        <span className="sea-text-sm sea-font-medium sea-text-gray-700">
          {label}
        </span>
      )}
      <div className="sea-relative">
        <input
          type="checkbox"
          className="sea-sr-only"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <div
          className={clsx(
            "sea-block sea-w-10 sea-h-6 sea-rounded-full sea-transition",
            disabled
              ? "sea-bg-gray-300"
              : checked
              ? "sea-bg-primary"
              : "sea-bg-primary sea-bg-opacity-40"
          )}
        ></div>
        <div
          className={clsx(
            "sea-absolute sea-top-1 sea-left-1 sea-h-4 sea-w-4 sea-bg-white sea-rounded-full sea-transition",
            checked ? "sea-translate-x-4" : ""
          )}
        ></div>
      </div>
    </label>
  );
}
