"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import SearchInput from "../search-input";
import { SelectOption } from "../select";
import clsx from "clsx";
import Loader from "../loader";

export type Props<T extends string | number | { id: string }> = {
  options: SelectOption<T>[];
  selectedOptions?: T[];
  setSelectedOptions?: (opts: T[]) => void;
  onOptionSelect?: (option: SelectOption<T>) => void;
  loading?: boolean;
} & Omit<React.ComponentProps<typeof SearchInput>, "onDebouncedChange"> & {
    onDebouncedChange?: (val: string) => void;
  };

export default function AutoCompleteInput<
  T extends string | number | { id: string }
>({
  name,
  options,
  selectedOptions = [],
  setSelectedOptions,
  onOptionSelect,
  value,
  onChange,
  onDebouncedChange,
  loading = false,
  ...rest
}: Props<T>) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState(value?.toString() ?? "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isAlreadySelected = (option: SelectOption<T>) => {
    return selectedOptions.some((selected) => {
      if (
        (typeof selected === "string" || typeof selected === "number") &&
        (typeof option.value === "string" || typeof option.value === "number")
      ) {
        return selected === option.value;
      }

      if (
        typeof selected === "object" &&
        typeof option.value === "object" &&
        "id" in selected &&
        "id" in option.value
      ) {
        return selected.id === option.value.id;
      }

      return false;
    });
  };

  const filteredOptions = options.filter((o) => !isAlreadySelected(o));

  const handleSelect = (option: SelectOption<T>) => {
    setInputValue("");
    onChange?.({ target: { name, value: "" } } as any);

    if (!isAlreadySelected(option)) {
      setSelectedOptions?.([...selectedOptions, option.value]);
    }

    onOptionSelect?.(option);
    setShow(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <SearchInput
        name={name}
        value={inputValue}
        onFocus={() => setShow(true)}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange?.(e);
        }}
        onDebouncedChange={(val) => {
          setShow(true);
          onDebouncedChange?.(val);
        }}
        autoComplete="off"
        {...rest}
      />

      {show && inputValue.trim() !== "" && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 flex justify-center items-center">
              <Loader />
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((o, i) => (
              <div
                key={`${name}-option-${i}`}
                className={clsx(
                  "px-4 py-2 cursor-pointer custom-animation hover:bg-primary hover:bg-opacity-20"
                )}
                onClick={() => handleSelect(o)}
              >
                {o.label}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
