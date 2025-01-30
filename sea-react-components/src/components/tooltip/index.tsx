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
  containerClassName = "sea-bg-secondary",
  textClassName = "sea-text-white",
}: Props) {
  const [visible, setVisible] = useState(false);

  // Define position classes based on the placement prop
  const positionClasses = {
    top: "sea-bottom-full sea-mb-2 sea-left-1/2 sea-transform -sea-translate-x-1/2",
    bottom:
      "sea-top-full sea-mt-2 sea-left-1/2 sea-transform -sea-translate-x-1/2",
    left: "sea-right-full sea-mr-2 sea-top-1/2 sea-transform -sea-translate-y-1/2",
    right:
      "sea-left-full sea-ml-2 sea-top-1/2 sea-transform -sea-translate-y-1/2",
  };

  return (
    <div
      className="sea-relative sea-inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={clsx(
            "sea-absolute sea-px-2 sea-py-1 sea-rounded sea-shadow-lg",
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
