import clsx from "clsx";
import React from "react";

export type Types =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error";

const colors: Record<Types, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  error: "bg-error",
};

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

const barHights: Record<Sizes, string> = {
  xs: "h-[6px]",
  sm: "h-[10px]",
  md: "h-[14px]",
  lg: "h-[20px]",
  xl: "h-[24px]",
};
const textSizes: Record<Sizes, string> = {
  xs: "text-[6px]",
  sm: "text-[10px]",
  md: "text-[12px]",
  lg: "text-[16px]",
  xl: "text-[20px]",
};

export type Props = {
  percentage?: number;
  showPercentage?: boolean;
  size?: Sizes;
  type?: Types;
} & React.HTMLAttributes<HTMLDivElement>;
export default function ProgressBar({
  percentage = 0,
  className,
  size = "md",
  type = "primary",
  showPercentage = false,
}: Props) {
  const hightClass = barHights[size];
  const textClass = textSizes[size];
  const bgClass = colors[type];

  return (
    <div className="relative bg-gray-300 rounded-full overflow-hidden">
      <div
        className={clsx(
          "w-full flex items-center rounded-full transition-all duration-300 ease-in-out",
          hightClass,
          textClass,
          bgClass,
          className
        )}
        style={{
          width: `${percentage}%`,
        }}
      >
        {showPercentage && (
          <p className=" text-white text-center w-full">
            {percentage ? percentage : 0} %
          </p>
        )}
      </div>
    </div>
  );
}
