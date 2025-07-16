import React from "react";
import Avatar, { AvatarSize, Props as AvatarProps } from "../avatar";
import clsx from "clsx";

const offsetFactor = 1.3;

const sizeValues: Record<AvatarSize, number> = {
  xs: 30,
  sm: 40,
  md: 50,
  lg: 70,
  xl: 90,
};

const DEFAULT_MAX = 3;

export type Props = {
  name: string;
  max?: number;
  size?: AvatarSize;
  className?: string | undefined;
  items: AvatarProps[];
};
export default function StackedAvatars({
  name,
  max = DEFAULT_MAX,
  size = "md",
  className,
  items,
}: Props) {
  if (max <= 0) max = DEFAULT_MAX;

  const sizeValue = sizeValues[size];

  const avatarsToDisplay = items.slice(0, max);

  const remaining = items.length - max;
  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{ height: sizeValue }}
    >
      {avatarsToDisplay.map((item, i) => (
        <Avatar
          key={`${name}-avatar-${i}`}
          {...item}
          className={clsx(className, "absolute")}
          style={{ left: (i * sizeValue) / offsetFactor }}
          size={size}
        />
      ))}

      {remaining > 0 && (
        <div
          className={clsx(
            className,
            "absolute flex items-center justify-center  text-white bg-secondary"
          )}
          style={{
            left: (max * sizeValue) / offsetFactor,
            width: sizeValue,
            height: sizeValue,
          }}
        >
          +{items.length - max}
        </div>
      )}
    </div>
  );
}
