"use client";
import React, { useEffect, useState, Suspense } from "react";
import clsx from "clsx";
import Pagination from "./components/pagination";
import Select, { SelectOption } from "../select";
import SearchInput from "./components/search-input";
import Checkbox from "../checkbox";
import Button, { Props as ButtonProps } from "../button";
import Icon from "../icon";

export const DEFAULT_TABLE_FILTER_VALUE = "all";

export type TableFilter<K> = {
  name: string;
  label?: string | undefined;
  options: SelectOption<K>[];
  value: K;
  setValue: (newValue: K) => void;
};

export type BulkActionFeature = {
  selectedRowIds: string[];
  setSelectedRowIds: (ids: string[]) => void;
  bulkActions: ButtonProps[];
};

export type TableColumn<T> = {
  key: string;
  label: string;
  custom?: (row: T) => React.ReactNode;
} & React.ThHTMLAttributes<HTMLTableHeaderCellElement>;

const DEFAULT_ROWS_PER_PAGE_OPTIONS: SelectOption<number>[] = [
  {
    label: "5",
    value: 5,
  },
  {
    label: "10",
    value: 10,
  },
  {
    label: "25",
    value: 25,
  },
  {
    label: "50",
    value: 50,
  },
];

export type Props<T, K> = {
  title?: string;
  name: string;
  filters?: TableFilter<K>[];
  columns: TableColumn<T>[];
  rows: ({ id: string } & T)[];
  totalPages: number;
  query: string;
  setQuery: (newQuery: string) => void;
  page: number;
  setPage: (newPage: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (newRowsPerPage: number) => void;
  rowsPerPageOptions?: SelectOption<number>[];
  QueryDebouncedTime?: number;
  updateParams?: (updates: Record<string, string>) => void;
  getParam?: (name: string) => string | null | undefined;
  bulkActionFeature?: BulkActionFeature | undefined;
  loading?: boolean;
};
export default function Table<T, K>({
  title,
  name,
  filters = [],
  columns,
  rows,
  totalPages,
  query,
  setQuery,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  updateParams,
  getParam,
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  QueryDebouncedTime = 500,
  bulkActionFeature = undefined,
  loading = false,
}: Props<T, K>) {
  const [paramNames, setParamNames] = useState<any>({
    page: `${name}-page`,
    query: `${name}-query`,
    rowsPerPage: `${name}-rows`,
  });

  useEffect(() => {
    const additionalParamNames: any = {};
    filters.forEach((f) => {
      if (!paramNames[f.name]) paramNames[f.name] = `${name}-${f.name}`;
    });
    setParamNames((prev) => {
      return {
        ...prev,
        ...additionalParamNames,
      };
    });
  }, [filters]);

  useEffect(() => {
    if (updateParams) {
      updateParams({ [paramNames.page]: page + "" });
    }
  }, [page]);

  useEffect(() => {
    if (updateParams) {
      updateParams({ [paramNames.query]: query });
    }
  }, [query]);

  useEffect(() => {
    if (updateParams) {
      updateParams({ [paramNames.rowsPerPage]: rowsPerPage + "" });
    }
  }, [rowsPerPage]);

  useEffect(() => {
    if (updateParams) {
      const paramsToUpdate: any = {};
      filters.forEach((f) => {
        paramsToUpdate[paramNames[f.name]] = f.value;
      });
      updateParams(paramsToUpdate);
    }
  }, [...filters.map((f) => f.value)]);

  useEffect(() => {
    let defaultPage = page,
      defaultRowsPerPage = rowsPerPage,
      defaultQuery = query,
      defaultFilters = filters.map((f) => f.value);

    if (getParam) {
      const p = getParam(paramNames.page);
      defaultPage = !p ? 1 : +p;
      const r = getParam(paramNames.rowsPerPage);
      defaultRowsPerPage = !r ? 5 : +r;
      const q = getParam(paramNames.query);
      defaultQuery = q ? q : "";
      filters.forEach((f, i) => {
        const fv = getParam(paramNames[f.name]);
        defaultFilters[i] = fv ? (fv as K) : (DEFAULT_TABLE_FILTER_VALUE as K);
      });
    }

    setPage(defaultPage);
    setRowsPerPage(defaultRowsPerPage);
    setQuery(defaultQuery);
    filters.forEach((f, i) => {
      f.setValue(defaultFilters[i]);
    });
  }, []);

  useEffect(() => {
    if (bulkActionFeature) bulkActionFeature.setSelectedRowIds([]);
  }, [...filters.map((f) => f.value), query]);

  return (
    <div className="sea-flex sea-flex-col sea-gap-5">
      {title && <h3 className="sea-text-2xl sea-font-semibold">{title}</h3>}

      <div className="sea-flex sea-items-center sea-gap-5 sea-justify-between sea-flex-wrap">
        <div className="sea-flex sea-items-end sea-gap-2 sea-flex-wrap">
          <SearchInput
            placeholder={`search about ${name}`}
            value={query}
            onDebouncedChange={setQuery}
            QueryDebouncedTime={QueryDebouncedTime}
          />
          {filters.map((f, i) => (
            <div
              key={`table-${name}-filter-${f.label}-${i}`}
              className="sea-flex sea-flex-col sea-gap-1"
            >
              {f.label && (
                <p className="sea-text-text sea-font-semibold">{f.label}</p>
              )}

              <Select<K>
                name={`table-${name}-filter-${f.label}-${i}`}
                values={[f.value]}
                setValues={(newValues) => f.setValue(newValues[0])}
                options={[
                  { label: "All", value: DEFAULT_TABLE_FILTER_VALUE as K },
                  ...f.options,
                ]}
                placeholder={f.label}
              />
            </div>
          ))}
        </div>

        {bulkActionFeature && (
          <div className="sea-flex sea-items-center sea-gap-2 sea-justify-end sea-w-full md:sea-w-fit">
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

      {loading ? (
        <div className="sea-flex sea-items-center sea-justify-center">
          <Icon
            icon="line-md:loading-loop"
            className="sea-text-primary sea-w-20 sea-h-20"
          />
        </div>
      ) : (
        <div className="sea-overflow-x-auto">
          <table className="sea-min-w-full sea-table-auto">
            <thead id={`table-${name}-head`}>
              <tr className="sea-text-text sea-uppercase sea-pb-2 sea-border-b-[1px] sea-border-b-gray-200">
                {bulkActionFeature && (
                  <th
                    key={`column-${name}-checkbox`}
                    className={clsx("sea-px-4 sea-py-2 sea-text-left")}
                  >
                    <Checkbox
                      checked={
                        bulkActionFeature.selectedRowIds.length === rows.length
                      }
                      onChange={(checked) => {
                        if (checked) {
                          bulkActionFeature.setSelectedRowIds(
                            rows.map((r) => r.id)
                          );
                        } else {
                          const currentPageIds = rows.map((r) => r.id);
                          const result =
                            bulkActionFeature.selectedRowIds.filter(
                              (item) => !currentPageIds.includes(item)
                            );
                          bulkActionFeature.setSelectedRowIds(result);
                        }
                      }}
                    />
                  </th>
                )}

                {columns.map((column, i) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { className, key, label, custom, ...restColumn } =
                    column;

                  return (
                    <th
                      key={`column-${name}-${i}-${key}`}
                      className={clsx(
                        "sea-px-4 sea-py-2 sea-text-left",
                        className
                      )}
                      {...restColumn}
                    >
                      {label}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody id={`table-${name}-body`}>
              {rows.map((row, i) => {
                return (
                  <tr
                    key={`row-${name}-${i}`}
                    className={clsx(
                      "sea-text-text sea-pb-2 hover:sea-bg-gray-200 sea-transition-all sea-duration-300 sea-ease-in-out",
                      i !== rows.length - 1 &&
                        "sea-border-b-[1px] sea-border-b-gray-200"
                    )}
                  >
                    {bulkActionFeature && (
                      <td
                        key={`row-${name}-${i}-checkbox`}
                        className="sea-px-4 sea-py-2"
                      >
                        <Checkbox
                          checked={
                            bulkActionFeature.selectedRowIds.includes(row.id) ||
                            false
                          }
                          onChange={(checked) => {
                            if (checked) {
                              bulkActionFeature.setSelectedRowIds([
                                ...bulkActionFeature.selectedRowIds,
                                row.id,
                              ]);
                            } else {
                              const selectedRowIds =
                                bulkActionFeature.selectedRowIds.filter(
                                  (rid) => rid !== row.id
                                );
                              bulkActionFeature.setSelectedRowIds(
                                selectedRowIds
                              );
                            }
                          }}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const value = (row as any)[column.key];

                      return (
                        <td
                          key={`row-${name}-${i}-${column.key}`}
                          className="sea-px-4 sea-py-2"
                        >
                          {column.custom ? column.custom(row) : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="sea-flex sea-items-center sea-justify-end sea-gap-5">
        <div className="sea-flex sea-items-center sea-gap-2">
          <p className="sea-text-text sea-text-sm">Rows per page</p>
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
    </div>
  );
}
