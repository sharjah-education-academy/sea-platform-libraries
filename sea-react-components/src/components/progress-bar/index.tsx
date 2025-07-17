import clsx from "clsx";
import React from "react";

export type ProgressBarType =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error";

export type ProgressBarSize = "xs" | "sm" | "md" | "lg" | "xl";

const backgroundColors: Record<ProgressBarType, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  error: "bg-error",
};

const barHeights: Record<ProgressBarSize, string> = {
  xs: "h-[6px]",
  sm: "h-[10px]",
  md: "h-[14px]",
  lg: "h-[20px]",
  xl: "h-[24px]",
};

const textSizes: Record<ProgressBarSize, string> = {
  xs: "text-[6px]",
  sm: "text-[7.5px]",
  md: "text-[10px]",
  lg: "text-[14px]",
  xl: "text-[16px]",
};

export type Props = {
  percentage?: number;
  showPercentage?: boolean;
  size?: ProgressBarSize;
  type?: ProgressBarType;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ProgressBar({
  percentage = 0,
  showPercentage = false,
  size = "md",
  type = "primary",
  className,
  ...rest
}: Props) {
  const heightClass = barHeights[size];
  const textClass = textSizes[size];
  const fillColor = backgroundColors[type];

  return (
    <div
      className={clsx(
        "w-full bg-gray-300 rounded-full overflow-hidden relative",
        heightClass,
        className
      )}
      {...rest}
    >
      <div
        className={clsx(
          "rounded-full transition-all duration-300 ease-in-out min-w-[1px]",
          fillColor
        )}
        style={{
          width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          height: "100%",
        }}
      />
      {showPercentage && (
        <div
          className={clsx(
            "absolute inset-0 flex items-center justify-center text-white pointer-events-none",
            textClass
          )}
        >
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
