import clsx from "clsx";
import React from "react";
import { PROFILE_PLACEHOLDER_IMAGE } from "../../constants/index";
import { Utils } from "sea-platform-helpers";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeValues: Record<AvatarSize, number> = {
  xs: 30,
  sm: 40,
  md: 50,
  lg: 70,
  xl: 90,
};

const textSizeClasses: Record<AvatarSize, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-base",
};

export type Props = {
  url?: string | undefined;
  size?: AvatarSize;
  alt: string;
  placeholder?: string;
  placeholderSource?: "image" | "letters";
} & React.ImgHTMLAttributes<HTMLImageElement>;
export default function Avatar({
  url,
  alt,
  size = "md",
  placeholder = PROFILE_PLACEHOLDER_IMAGE,
  className,
  placeholderSource = "image",
  ...props
}: Props) {
  const sizeValue = sizeValues[size];
  const textClass = textSizeClasses[size];

  if (!url && placeholderSource === "letters")
    return (
      <div
        style={{ width: sizeValue, height: sizeValue }}
        className="flex items-center justify-center rounded-full bg-gray-100 border-[1px] border-gray-200"
      >
        <p className={textClass}> {Utils.String.getInitials(alt)}</p>
      </div>
    );
  if (!url && placeholderSource === "image") url = url || placeholder;

  return (
    <img
      {...props}
      src={url}
      alt={alt}
      width={sizeValue}
      height={sizeValue}
      className={clsx(
        "object-cover rounded-full border-[1px] border-gray-400",
        className
      )}
    />
  );
}
