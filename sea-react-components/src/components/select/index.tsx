"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export type SelectOption<T> = {
  value: T;
  label: React.ReactNode; // changed from string to React.ReactNode
};

export type Props<T> = {
  name: string;
  options: SelectOption<T>[];
  values: T[];
  setValues: (newValues: T[]) => void;
  errorMessage?: string | boolean;
  buttonClassName?: string;
  placeholder?: string;
  multiselect?: boolean;
};

export default function Select<T>({
  name,
  options,
  values,
  setValues,
  errorMessage,
  buttonClassName,
  placeholder = "Select an option",
  multiselect = false,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((o) =>
    values.some((v) => Object.is(v, o.value))
  );

  const toggleOption = (option: SelectOption<T>) => {
    if (multiselect) {
      const isSelected = values.some((v) => Object.is(v, option.value));
      const updated = isSelected
        ? values.filter((v) => !Object.is(v, option.value))
        : [...values, option.value];
      setValues(updated);
    } else {
      setValues([option.value]);
      setIsOpen(false);
    }
  };

  const removeSelected = (option: SelectOption<T>) => {
    setValues(values.filter((v) => !Object.is(v, option.value)));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div ref={containerRef} className="relative w-full">
        <div
          onClick={() => setIsOpen((o) => !o)}
          className={clsx(
            "text-text cursor-pointer flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-md border-0.5",
            errorMessage
              ? "border-error"
              : isOpen
              ? "border-primary"
              : "border-gray-200",
            buttonClassName
          )}
        >
          {multiselect ? (
            selectedOptions.length ? (
              <div className="flex flex-wrap gap-2">
                {selectedOptions.map((o, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="bg-primary bg-opacity-50 px-2 py-1 rounded-2xl flex items-center gap-1"
                  >
                    <div className="text-black text-sm">{o.label}</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelected(o);
                      }}
                    >
                      <Icon icon="line-md:close-small" className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">{placeholder}</p>
            )
          ) : selectedOptions[0] ? (
            <div>{selectedOptions[0].label}</div>
          ) : (
            <p className="text-gray-500">{placeholder}</p>
          )}
          <Icon icon="iconamoon:arrow-down-2" />
        </div>

        {isOpen && (
          <div className="absolute left-0 mt-1 w-full z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-auto animate-fade-in">
            {options.map((o, i) => {
              const isSelected = selectedOptions.some((s) =>
                Object.is(s.value, o.value)
              );

              return (
                <div
                  key={`${name}-option-${i}`}
                  onClick={() => toggleOption(o)}
                  className={clsx(
                    "px-4 py-2 cursor-pointer custom-animation",
                    isSelected && "bg-primary text-white",
                    !isSelected && "hover:bg-primary hover:bg-opacity-20"
                  )}
                >
                  {o.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="pl-1 text-sm text-error">{errorMessage}</p>
      )}
    </div>
  );
}
