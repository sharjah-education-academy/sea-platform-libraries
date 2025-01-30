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
            "sea-fixed sea-z-50 sea-inset-0 sea-bg-black sea-bg-opacity-50 sea-transition-opacity sea-duration-300",
            { "sea-opacity-0 sea-pointer-events-none": !isOpen }
          )}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={clsx(
          "sea-fixed sea-bg-white sea-shadow-lg sea-z-50 sea-transition-transform sea-duration-300 sea-py-7 sea-px-2",
          {
            "sea-top-0 sea-left-0 sea-w-full sea-h-auto sea-transform -sea-translate-y-full":
              placement === "top" && !isOpen,
            "sea-top-0 sea-left-0 sea-w-full sea-h-auto sea-translate-y-0":
              placement === "top" && isOpen,
            "sea-top-0 sea-right-0 sea-h-full sea-transform sea-translate-x-full sea-w-[85%] md:sea-w-[40%]":
              placement === "right" && !isOpen,
            "sea-top-0 sea-right-0 sea-h-full sea-translate-x-0 sea-w-[85%] md:sea-w-[40%]":
              placement === "right" && isOpen,
            "sea-top-0 sea-left-0 sea-h-full sea-transform -sea-translate-x-full sea-w-[85%] md:sea-w-[40%]":
              placement === "left" && !isOpen,
            "sea-top-0 sea-left-0 sea-h-full sea-translate-x-0 sea-w-[85%] md:sea-w-[40%]":
              placement === "left" && isOpen,
            "sea-bottom-0 sea-left-0 sea-w-full sea-h-auto sea-transform sea-translate-y-full":
              placement === "bottom" && !isOpen,
            "sea-bottom-0 sea-left-0 sea-w-full sea-h-auto sea-translate-y-0":
              placement === "bottom" && isOpen,
          },
          className
        )}
      >
        <button
          onClick={onClose}
          className="sea-absolute sea-top-2 sea-right-2 sea-text-secondary-dark"
        >
          <Icon
            icon="line-md:close-small"
            className="sea-h-5 sea-w-5 hover:sea-scale-110 sea-transition-all sea-duration-300 sea-ease-in-out"
          />
        </button>
        {children}
      </div>
    </>
  );
}
