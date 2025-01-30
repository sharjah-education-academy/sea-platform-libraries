import clsx from "clsx";

import PageButton from "../page-button";
import { Icon } from "@iconify/react";

const AROUND_BUTTONS_COUNT = 3;

type Props = {
  name: string;
  totalPages: number;
  page: number;
  setPage: (newPage: number) => void;
};
export default function Pagination({ name, totalPages, page, setPage }: Props) {
  const handleChangePage = (newPage: number) => {
    if (newPage < 1) newPage = 1;
    else if (newPage > totalPages) newPage = totalPages;

    setPage(newPage);
  };

  const previousDisabled = page === 1 || totalPages === 0;
  const nextDisabled = page === totalPages || totalPages === 0;

  const renderPageNumbers = () => {
    if (totalPages <= AROUND_BUTTONS_COUNT) {
      // Show all pages if totalPages <= AROUND_BUTTONS_COUNT
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <PageButton
          key={`table-${name}-page-${p}`}
          currentPage={page}
          page={p}
          handleChangePage={handleChangePage}
        />
      ));
    }

    const pages = [];
    const showLeftEllipsis = page > AROUND_BUTTONS_COUNT;
    const showRightEllipsis = page <= totalPages - AROUND_BUTTONS_COUNT;

    // Add first page
    pages.push(
      <PageButton
        key={`table-${name}-page-1`}
        currentPage={page}
        page={1}
        handleChangePage={handleChangePage}
      />
    );

    // Add left ellipsis
    if (showLeftEllipsis) {
      pages.push(
        <span key={`table-${name}-ellipsis-left`} className="sea-text-gray-400">
          ...
        </span>
      );
    }

    // Add middle pages
    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);

    for (let p = startPage; p <= endPage; p++) {
      pages.push(
        <PageButton
          key={`table-${name}-page-${p}`}
          currentPage={page}
          page={p}
          handleChangePage={handleChangePage}
        />
      );
    }

    // Add right ellipsis
    if (showRightEllipsis) {
      pages.push(
        <span
          key={`table-${name}-ellipsis-right`}
          className="sea-text-gray-400"
        >
          ...
        </span>
      );
    }

    // Add last page
    pages.push(
      <PageButton
        key={`table-${name}-page-${totalPages}`}
        currentPage={page}
        page={totalPages}
        handleChangePage={handleChangePage}
      />
    );

    return pages;
  };

  return (
    <div className="sea-flex sea-items-center sea-justify-end sea-gap-3">
      <button
        disabled={previousDisabled}
        onClick={() => handleChangePage(page - 1)}
      >
        <Icon
          icon="ooui:next-rtl"
          className={clsx(
            "sea-transition-all sea-duration-300 sea-ease-in-out",
            previousDisabled
              ? "sea-text-gray-200"
              : "sea-text-secondary hover:sea-text-opacity-50"
          )}
        />
      </button>

      {renderPageNumbers()}

      {/* {Array(totalPages)
        .fill({})
        .map((_, i) => {
          return (
            <PageButton
              key={`table-${name}-page-${i + 1}`}
              currentPage={page}
              page={i + 1}
              handleChangePage={handleChangePage}
            />
          );
        })} */}

      <button
        disabled={nextDisabled}
        onClick={() => handleChangePage(page + 1)}
      >
        <Icon
          icon="ooui:next-ltr"
          className={clsx(
            "sea-transition-all sea-duration-300 sea-ease-in-out",
            nextDisabled
              ? "sea-text-gray-200"
              : "sea-text-secondary hover:sea-text-opacity-50"
          )}
        />
      </button>
    </div>
  );
}
