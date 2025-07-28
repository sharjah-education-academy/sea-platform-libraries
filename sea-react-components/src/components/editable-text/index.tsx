"use client";
import React, { useEffect, useRef, useState, ReactNode } from "react";

export type Props = {
  DisplayComponent: ReactNode;
  InputComponent: ReactNode;
  onSubmit: () => void;
};

export default function EditableText({
  DisplayComponent,
  InputComponent,
  onSubmit,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEdit &&
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        onSubmit();
        setIsEdit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEdit, onSubmit]);

  return (
    <div
      ref={formRef}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   onSubmit();
      //   setIsEdit(false);
      // }}
    >
      {isEdit ? (
        <>{InputComponent}</>
      ) : (
        <div onClick={() => setIsEdit(true)}>{DisplayComponent}</div>
      )}
    </div>
  );
}
