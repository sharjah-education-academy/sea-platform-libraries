import React from "react";
import Avatar, { AvatarSize, Props as AvatarProps } from "../avatar";
import clsx from "clsx";

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
  items: AvatarProps[];
  max?: number;
  size?: AvatarSize;
  className?: string;
  offsetFactor?: number; // Controls overlap
};

export default function StackedAvatars({
  name,
  items,
  max = DEFAULT_MAX,
  size = "md",
  className,
  offsetFactor = 1.3,
}: Props) {
  const sizeValue = sizeValues[size];
  const clampedMax = Math.max(1, Math.min(max, items.length));
  const avatarsToDisplay = items.slice(0, clampedMax);
  const remainingCount = items.length - clampedMax;

  return (
    <div
      className={clsx("relative flex", className)}
      style={{ height: sizeValue }}
    >
      {avatarsToDisplay.map((item, i) => (
        <div
          key={`${name}-avatar-${i}`}
          className="absolute"
          style={{
            left: `${(i * sizeValue) / offsetFactor}px`,
            zIndex: avatarsToDisplay.length - i,
          }}
        >
          <Avatar {...item} size={size} />
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className="absolute flex items-center justify-center bg-gray-400 text-white rounded-full text-xs font-medium"
          style={{
            left: `${(clampedMax * sizeValue) / offsetFactor}px`,
            width: sizeValue,
            height: sizeValue,
            zIndex: 0,
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
