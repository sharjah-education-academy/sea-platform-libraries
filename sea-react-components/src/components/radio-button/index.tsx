import clsx from "clsx";
import React from "react";

export type Props = {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  label: React.ReactElement;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function RadioButton({
  id,
  name,
  checked,
  onChange,
  label,
  ...props
}: Props) {
  return (
    <label
      htmlFor={id}
      className="sea-flex sea-items-center sea-space-x-2 sea-cursor-pointer"
    >
      <input
        {...props}
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />

      <div
        className={clsx(
          "sea-w-5 sea-h-5 sea-rounded-full sea-border-2 sea-flex sea-items-center sea-justify-center",
          checked
            ? "sea-bg-primary sea-border-primary"
            : "sea-bg-white sea-border-gray-300"
        )}
      >
        {checked && (
          <div className="sea-w-3 sea-h-3 sea-rounded-full sea-bg-white" />
        )}
      </div>

      {label}
    </label>
  );
}
