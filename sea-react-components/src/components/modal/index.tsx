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
  sm: "sea-w-1/2 md:sea-w-1/4 sea-h-auto",
  md: "sea-w-1/2 sea-md:w-1/3 sea-h-auto",
  lg: "sea-w-5/6 md:sea-w-1/2 sea-h-auto",
  xl: "sea-w-5/6 md:sea-w-3/4 sea-h-auto",
};

const positionClasses: Record<ModalPosition, string> = {
  center:
    "sea-top-1/2 sea-left-1/2 sea-transform -sea-translate-x-1/2 -sea-translate-y-1/2",
  top: "sea-top-5 sea-left-1/2 sea-transform -sea-translate-x-1/2",
  "top-left": "sea-top-5 sea-left-5",
  "top-right": "sea-top-5 sea-right-5",
  bottom: "sea-bottom-5 sea-left-1/2 sea-transform -sea-translate-x-1/2",
  "bottom-left": "sea-bottom-5 sea-left-5",
  "bottom-right": "sea-bottom-5 sea-right-5",
  left: "sea-top-1/2 sea-left-5 sea-transform -sea-translate-y-1/2",
  right: "sea-top-1/2 sea-right-5 sea-transform -sea-translate-y-1/2",
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
      className="sea-fixed sea-inset-0 sea-bg-black sea-bg-opacity-50 sea-z-50 sea-flex sea-justify-center sea-items-center"
      onClick={onClose}
    >
      <div
        className={clsx(
          "sea-absolute sea-bg-white sea-rounded-lg sea-shadow-lg sea-p-6",
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
          className="sea-absolute sea-top-2 sea-right-2 sea-text-secondary-dark"
        >
          <Icon
            icon="line-md:close-small"
            className="sea-h-5 sea-w-5 hover:sea-scale-110 sea-transition-all sea-duration-300 sea-ease-in-out"
          />
        </button>
        {children}
      </div>
    </div>
  );
}
