"use client";
import React from "react";
import clsx from "clsx";
import Select, { SelectOption } from "../select";
import Button from "../button";

import SearchInput from "../search-input";
import Pagination from "./components/pagination";
import {
  BulkActionFeature,
  Filter,
  DEFAULT_FILTER_VALUE,
} from "../../hooks/list-items-hook/types";
import { useFilters } from "../..//hooks/list-items-hook/useFilters";
import { usePagination } from "../../hooks/list-items-hook/usePagination";
import { useBulkActions } from "../../hooks/list-items-hook/useBulkActions";
import Loader from "../loader";

export type Props<K> = {
  title?: string;
  name: string;
  filters?: Filter<K>[];
  totalPages: number;
  query: string;
  setQuery: (newQuery: string) => void;
  page: number;
  setPage: (newPage: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (newRowsPerPage: number) => void;
  rowsPerPageOptions: SelectOption<number>[];
  QueryDebouncedTime?: number;
  updateParams?: (updates: Record<string, string>) => void;
  getParam?: (name: string) => string | null | undefined;
  bulkActionFeature?: BulkActionFeature | undefined;
  loading?: boolean;
  showPaginationRow?: boolean;
  showFiltersRow?: boolean;
  children?: React.ReactNode;
};
export default function ListItem<K>({
  title,
  name,
  filters = [],
  totalPages,
  query,
  setQuery,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  updateParams,
  getParam,
  rowsPerPageOptions,
  QueryDebouncedTime = 500,
  bulkActionFeature = undefined,
  loading = false,
  showPaginationRow = true,
  showFiltersRow = true,
  children,
}: Props<K>) {
  useFilters<K>(name, filters, updateParams, getParam);
  usePagination(
    name,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    updateParams,
    getParam
  );
  useBulkActions<K>(bulkActionFeature, filters, query);

  return (
    <div className="flex flex-col gap-5">
      {title && (
        <h3 className="text-2xl font-semibold text-primary">{title}</h3>
      )}

      <div
        className={clsx(
          "flex items-center gap-5 flex-wrap",
          showFiltersRow && bulkActionFeature
            ? "justify-between"
            : "justify-end"
        )}
      >
        {showFiltersRow && (
          <div className="flex items-end gap-2 flex-wrap">
            <SearchInput
              placeholder={`search about ${name}`}
              value={query}
              onDebouncedChange={setQuery}
              QueryDebouncedTime={QueryDebouncedTime}
            />
            {filters.map((f, i) => (
              <div
                key={`table-${name}-filter-${f.label}-${i}`}
                className="flex flex-col gap-1"
              >
                {f.label && (
                  <p className="text-text font-semibold">{f.label}</p>
                )}

                <Select<K>
                  name={`table-${name}-filter-${f.label}-${i}`}
                  values={[f.value]}
                  setValues={(newValues) => f.setValue(newValues[0])}
                  options={[
                    { label: "All", value: DEFAULT_FILTER_VALUE as K },
                    ...f.options,
                  ]}
                  placeholder={f.label}
                />
              </div>
            ))}
          </div>
        )}

        {bulkActionFeature && (
          <div className="flex items-center gap-2 justify-end w-full md:w-fit">
            {bulkActionFeature.bulkActions.map((a, i) => (
              <Button
                key={`table-${name}-bulk-action-${i}`}
                {...a}
                disabled={bulkActionFeature.selectedRowIds.length === 0}
              ></Button>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>{children}</>
        )}
      </div>

      {showPaginationRow && (
        <div className="flex items-center justify-end gap-5">
          <div className="flex items-center gap-2">
            <p className="text-text text-sm">Rows per page</p>
            <Select<number>
              name={`${name}-select`}
              values={[rowsPerPage]}
              setValues={(newValues) => setRowsPerPage(newValues[0])}
              options={rowsPerPageOptions}
            />
          </div>

          {totalPages >= 1 && (
            <Pagination
              name={name}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </div>
  );
}
