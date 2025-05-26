"use client";
import React from "react";
import clsx from "clsx";

type Props = {
  page: number;
  currentPage: number;
  handleChangePage: (newPage: number) => void;
};
export default function PageButton({
  page,
  currentPage,
  handleChangePage,
}: Props) {
  return (
    <button
      type="button"
      className={clsx(
        "border-b-2 w-8 h-8 rounded-md flex items-center justify-center bg-opacity-30 overflow-hidden hover:bg-secondary hover:bg-opacity-10 hover:border-b-secondary transition-all duration-300 ease-in-out",
        page === currentPage
          ? "border-b-secondary bg-secondary"
          : "border-b-gray-200 bg-gray-200"
      )}
      onClick={() => handleChangePage(page)}
    >
      <p className="truncate text-sm"> {page}</p>
    </button>
  );
}
