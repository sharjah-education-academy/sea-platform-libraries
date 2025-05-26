import React from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

export type Placement = "top" | "left" | "right" | "bottom";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  placement?: Placement;
  overlay?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Drawer({
  isOpen,
  onClose,
  placement = "right",
  overlay = true,
  className,
  children,
}: Props) {
  return (
    <>
      {/* Overlay */}
      {overlay && isOpen && (
        <div
          className={clsx(
            "fixed z-50 inset-0 bg-black bg-opacity-50 transition-opacity duration-300",
            { "opacity-0 pointer-events-none": !isOpen }
          )}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={clsx(
          "fixed bg-white shadow-lg z-50 transition-transform duration-300 py-7 px-2",
          {
            "top-0 left-0 w-full h-auto transform -translate-y-full":
              placement === "top" && !isOpen,
            "top-0 left-0 w-full h-auto translate-y-0":
              placement === "top" && isOpen,
            "top-0 right-0 h-full transform translate-x-full w-[85%] md:w-[40%]":
              placement === "right" && !isOpen,
            "top-0 right-0 h-full translate-x-0 w-[85%] md:w-[40%]":
              placement === "right" && isOpen,
            "top-0 left-0 h-full transform -translate-x-full w-[85%] md:w-[40%]":
              placement === "left" && !isOpen,
            "top-0 left-0 h-full translate-x-0 w-[85%] md:w-[40%]":
              placement === "left" && isOpen,
            "bottom-0 left-0 w-full h-auto transform translate-y-full":
              placement === "bottom" && !isOpen,
            "bottom-0 left-0 w-full h-auto translate-y-0":
              placement === "bottom" && isOpen,
          },
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-secondary-dark"
        >
          <Icon
            icon="line-md:close-small"
            className="h-5 w-5 hover:scale-110 transition-all duration-300 ease-in-out"
          />
        </button>
        {children}
      </div>
    </>
  );
}
