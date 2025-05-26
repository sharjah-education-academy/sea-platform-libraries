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
    <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
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
          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
          checked ? "bg-primary border-primary" : "bg-white border-gray-300"
        )}
      >
        {checked && <div className="w-3 h-3 rounded-full bg-white" />}
      </div>

      {label}
    </label>
  );
}
