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
  primary: "sea-bg-primary",
  secondary: "sea-bg-secondary",
  success: "sea-bg-success",
  info: "sea-bg-info",
  warning: "sea-bg-warning",
  error: "sea-bg-error",
};

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

const barHights: Record<Sizes, string> = {
  xs: "sea-h-[6px]",
  sm: "sea-h-[10px]",
  md: "sea-h-[14px]",
  lg: "sea-h-[20px]",
  xl: "sea-h-[24px]",
};
const textSizes: Record<Sizes, string> = {
  xs: "sea-text-[6px]",
  sm: "sea-text-[10px]",
  md: "sea-text-[12px]",
  lg: "sea-text-[16px]",
  xl: "sea-text-[20px]",
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
    <div className="sea-relative sea-bg-gray-300 sea-rounded-full sea-overflow-hidden">
      <div
        className={clsx(
          "sea-w-full sea-flex sea-items-center sea-rounded-full sea-transition-all sea-duration-300 sea-ease-in-out",
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
          <p className=" sea-text-white sea-text-center sea-w-full">
            {percentage ? percentage : 0} %
          </p>
        )}
      </div>
    </div>
  );
}
