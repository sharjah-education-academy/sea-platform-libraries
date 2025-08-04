"use client";
import React, { useEffect, useRef, useState, UIEvent } from "react";
import clsx from "clsx";

export type MenuSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<MenuSize, string> = {
  sm: "w-52",
  md: "w-72",
  lg: "w-80",
  xl: "w-96",
};

export type Props = {
  menuButton: React.ReactNode;
  children: React.ReactNode;
  size?: MenuSize;
  maxHeight?: number;
  onReachBottom?: () => void; // invoked when scroll reaches bottom
} & React.HTMLAttributes<HTMLDivElement>;

export default function NativeMenu({
  menuButton,
  children,
  className,
  size = "md",
  maxHeight = 200,
  onReachBottom,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const checkBottom = () => {
    const target = scrollRef.current;
    if (!target) return false;
    return target.scrollHeight - target.scrollTop <= target.clientHeight + 1;
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (checkBottom() && onReachBottom) {
      onReachBottom();
    }
  };

  // Trigger onReachBottom when menu opens if already at bottom
  useEffect(() => {
    if (open && onReachBottom && checkBottom()) {
      onReachBottom();
    }
  }, [open]);

  return (
    <div
      className={clsx("relative inline-block text-left", className)}
      ref={menuRef}
      {...props}
    >
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {menuButton}
      </div>

      {open && (
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={clsx(
            "absolute right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-x-hidden",
            sizeClasses[size]
          )}
          style={{
            maxHeight: maxHeight,
            overflowY: "auto",
          }}
        >
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
}
