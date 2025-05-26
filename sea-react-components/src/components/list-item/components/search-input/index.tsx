"use client";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Input, { Props as InputProps } from "../../../input";

export type Props = {
  onDebouncedChange: (newValue: string) => void;
  QueryDebouncedTime?: number;
} & InputProps;
export default function SearchInput({
  value,
  onDebouncedChange,
  QueryDebouncedTime = 500,
  ...props
}: Props) {
  const [currentValue, setCurrentValue] = useState<string>(value as string);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    setCurrentValue((value || "").toString());
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(currentValue);
    }, QueryDebouncedTime);

    // Cleanup the timeout on every keystroke
    return () => clearTimeout(handler);
  }, [currentValue, QueryDebouncedTime]);

  // Trigger the callback when debouncedQuery changes
  useEffect(() => {
    if (onDebouncedChange) {
      onDebouncedChange(debouncedQuery);
    }
  }, [debouncedQuery, onDebouncedChange]);
  return (
    <Input
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      end={
        <Icon icon="material-symbols:search" className="w-5 h-5 text-primary" />
      }
      {...props}
    />
  );
}
