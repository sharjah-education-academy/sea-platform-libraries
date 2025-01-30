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
          <div className="sea-flex sea-items-center sea-gap-3">
            {selectedOptions.map((o, i) => (
              <div
                key={`option-${i}`}
                className="sea-bg-primary sea-bg-opacity-50 sea-px-2 sea-py-1 sea-rounded-2xl sea-flex sea-items-center sea-gap-1"
              >
                <p className="sea-text-black">{o.label}</p>

                <Icon
                  icon="line-md:close-small"
                  className="sea-h-5 sea-w-5 hover:sea-scale-110 sea-transition-all sea-duration-300 sea-ease-in-out"
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
            "sea-text-text sea-flex sea-items-center sea-justify-between sea-gap-2 sea-bg-white sea-px-3 sea-py-2 sea-rounded-xl sea-border-0.5 hover:sea-border-primary",
            errorMessage
              ? "sea-border-error"
              : isFocused
              ? "sea-border-primary"
              : "sea-border-gray-200",
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
        <div className="sea-flex sea-flex-col sea-gap-2 sea-p-1 sea-min-w-36">
          {options.map((o, i) => (
            <MenuItem
              key={`${name}-option-${i}`}
              selected={selectedOptions.includes(o)}
              onClick={() => handleClickOption(o)}
              children={
                <p className="sea-flex sea-items-center sea-gap-2 sea-px-4 sea-py-2 sea-text-left">
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
