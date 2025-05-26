"use client";
import clsx from "clsx";
import React, { ReactNode, useState } from "react";

export type Props = {
  text: string;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  containerClassName?: string;
  textClassName?: string;
};

export default function Tooltip({
  text,
  children,
  placement = "top",
  containerClassName = "bg-secondary",
  textClassName = "text-white",
}: Props) {
  const [visible, setVisible] = useState(false);

  // Define position classes based on the placement prop
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={clsx(
            "absolute px-2 py-1 rounded shadow-lg",
            positionClasses[placement],
            containerClassName
          )}
        >
          <p className={textClassName}> {text}</p>
        </div>
      )}
    </div>
  );
}
