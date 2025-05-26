import { Icon } from "@iconify/react";
import clsx from "clsx";
import React, { ReactNode } from "react";

export type ModalPosition =
  | "center"
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right";

export type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ModalSize, string> = {
  sm: "w-1/2 md:w-1/4 h-auto",
  md: "w-1/2 md:w-1/3 h-auto",
  lg: "w-5/6 md:w-1/2 h-auto",
  xl: "w-5/6 md:w-3/4 h-auto",
};

const positionClasses: Record<ModalPosition, string> = {
  center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  top: "top-5 left-1/2 transform -translate-x-1/2",
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  bottom: "bottom-5 left-1/2 transform -translate-x-1/2",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
  left: "top-1/2 left-5 transform -translate-y-1/2",
  right: "top-1/2 right-5 transform -translate-y-1/2",
};

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
} & React.HTMLAttributes<HTMLDivElement>;
export default function Modal({
  isOpen,
  onClose,
  children,
  position = "center",
  size = "md",
  className,
  onClick,
  ...props
}: Props) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className={clsx(
          "absolute bg-white rounded-lg shadow-lg p-6",
          sizeClasses[size],
          positionClasses[position],
          className
        )}
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing when clicking inside the modal
          if (onClick) onClick(e);
        }}
        {...props}
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
    </div>
  );
}
