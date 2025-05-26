import clsx from "clsx";
import React from "react";
import { PROFILE_PLACEHOLDER_IMAGE } from "../../constants/index";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizeValues: Record<AvatarSize, number> = {
  sm: 30,
  md: 50,
  lg: 70,
  xl: 90,
};

export type Props = {
  url?: string | undefined;
  size?: AvatarSize;
  alt: string;
  placeholder?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;
export default function Avatar({
  url,
  alt,
  size = "md",
  placeholder = PROFILE_PLACEHOLDER_IMAGE,
  className,
  ...props
}: Props) {
  const sizeValue = sizeValues[size];

  url = url || placeholder;

  return (
    <img
      {...props}
      src={url}
      alt={alt}
      width={sizeValue}
      height={sizeValue}
      className={clsx("object-cover", className)}
    />
  );
}
