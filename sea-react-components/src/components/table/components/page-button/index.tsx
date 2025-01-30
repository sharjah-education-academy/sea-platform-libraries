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
        "sea-border-b-2 sea-w-8 sea-h-8 sea-rounded-md sea-flex sea-items-center sea-justify-center sea-bg-opacity-30 sea-overflow-hidden hover:sea-bg-secondary hover:sea-bg-opacity-10 hover:sea-border-b-secondary sea-transition-all sea-duration-300 sea-ease-in-out",
        page === currentPage
          ? "sea-border-b-secondary sea-bg-secondary"
          : "sea-border-b-gray-200 sea-bg-gray-200"
      )}
      onClick={() => handleChangePage(page)}
    >
      <p className="sea-truncate sea-text-sm"> {page}</p>
    </button>
  );
}
