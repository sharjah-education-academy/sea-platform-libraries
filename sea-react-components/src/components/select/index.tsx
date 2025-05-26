"use client";
import React, { useState } from "react";

import Menu from "../menu";
import MenuItem from "../menu/menu-item";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import Button from "../button";

export type SelectOption<T> = {
  value: T;
  label: string;
};

export type Props<T> = {
  name: string;
  options: SelectOption<T>[];
  values: T[];
  setValues: (newValues: T[]) => void;
  errorMessage?: string | boolean;
  buttonClassName?: string | undefined;
  placeholder?: string | undefined;
  multiselect?: boolean;
};
export default function Select<T>({
  name,
  setValues,
  options,
  errorMessage,
  buttonClassName,
  values,
  placeholder = "Select an option",
  multiselect = false,
}: Props<T>) {
  const [isFocused, setIsFocused] = useState(false);

  const selectedOptions = options.filter((o) => values.includes(o.value));

  const renderSelectContent = () => (
    <>
      {multiselect ? (
        selectedOptions.length ? (
          <div className="flex items-center gap-3">
            {selectedOptions.map((o, i) => (
              <div
                key={`option-${i}`}
                className="bg-primary bg-opacity-50 px-2 py-1 rounded-2xl flex items-center gap-1"
              >
                <p className="text-black">{o.label}</p>

                <Icon
                  icon="line-md:close-small"
                  className="h-5 w-5 hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() => handleRemoveSelectedOption(o)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>{placeholder}</p>
        )
      ) : selectedOptions[0] ? (
        <p>{selectedOptions[0].label}</p>
      ) : (
        <p>{placeholder}</p>
      )}
    </>
  );

  const handleRemoveSelectedOption = (option: SelectOption<T>) => {
    const updatedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption !== option
    );
    setValues(updatedOptions.map((opt) => opt.value));
  };

  const handleClickOption = (option: SelectOption<T>) => {
    if (multiselect) {
      const isSelected = selectedOptions.includes(option);

      if (isSelected) {
        handleRemoveSelectedOption(option);
      } else {
        const updatedOptions = [...selectedOptions, option];
        setValues(updatedOptions.map((opt) => opt.value));
      }
    } else {
      setValues([option.value]);
    }
  };

  return (
    <Menu
      menuButton={
        <div
          className={clsx(
            "text-text flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border-0.5 hover:border-primary",
            errorMessage
              ? "border-error"
              : isFocused
              ? "border-primary"
              : "border-gray-200",
            buttonClassName
          )}
        >
          {renderSelectContent()}
          <Icon icon="iconamoon:arrow-down-2" />
        </div>
      }
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      children={
        <div className="flex flex-col gap-2 p-1 min-w-36">
          {options.map((o, i) => (
            <MenuItem
              key={`${name}-option-${i}`}
              selected={selectedOptions.includes(o)}
              onClick={() => handleClickOption(o)}
              children={
                <p className="flex items-center gap-2 px-4 py-2 text-left">
                  {o.label}
                </p>
              }
            />
          ))}
        </div>
      }
    />
  );
}
