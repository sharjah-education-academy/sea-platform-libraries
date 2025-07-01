"use client";
import React from "react";
import clsx from "clsx";
import Checkbox from "../checkbox";
import Icon from "../icon";

import { BulkActionFeature } from "../../hooks/list-items-hook/types";

export const DEFAULT_TABLE_ROWS_PER_PAGE_OPTIONS = [10, 20, 50].map((item) => ({
  label: item.toString(),
  value: item,
}));

export type TableColumn<T> = {
  key: string;
  label: string;
  custom?: (row: T) => React.ReactNode;
} & React.ThHTMLAttributes<HTMLTableHeaderCellElement>;

export type Props<T> = {
  name: string;
  columns: TableColumn<T>[];
  rows: ({ id: string } & T)[];
  bulkActionFeature?: BulkActionFeature | undefined;
  loading?: boolean;
};
export default function Table<T>({
  name,
  columns,
  rows,
  bulkActionFeature,
  loading = false,
}: Props<T>) {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="flex flex-col gap-5">
          <table className="min-w-full table-auto">
            <thead id={`loading-table-${name}-head`} className="bg-gray-100">
              <tr className="text-text pb-2 border-b-[2px] border-b-gray-100">
                {bulkActionFeature && (
                  <th
                    key={`loading-column-${name}-checkbox`}
                    className={clsx("px-4 py-2 text-left")}
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
                      key={`loading-column-${name}-${i}-${key}`}
                      className={clsx("px-4 py-2 text-left", className)}
                      {...restColumn}
                    >
                      {label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody id={`loading-table-${name}-body`}></tbody>
          </table>
          <div className="flex items-center justify-center">
            <Icon
              icon="line-md:loading-loop"
              className="text-primary w-20 h-20"
            />
          </div>
        </div>
      ) : (
        <table className="min-w-full table-auto">
          <thead id={`table-${name}-head`} className="bg-gray-100">
            <tr className="text-text pb-2 border-b-[2px] border-b-gray-100">
              {bulkActionFeature && (
                <th
                  key={`column-${name}-checkbox`}
                  className={clsx("px-4 py-2 text-left")}
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
                        const result = bulkActionFeature.selectedRowIds.filter(
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
                const { className, key, label, custom, ...restColumn } = column;

                return (
                  <th
                    key={`column-${name}-${i}-${key}`}
                    className={clsx("px-4 py-2 text-left", className)}
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
                    "text-text pb-2 ",
                    i !== rows.length - 1 && "border-b-[2px] border-gray-100"
                  )}
                >
                  {bulkActionFeature && (
                    <td key={`row-${name}-${i}-checkbox`} className="px-4 py-2">
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
                            bulkActionFeature.setSelectedRowIds(selectedRowIds);
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
                        className="px-4 py-2"
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
      )}
    </div>
  );
}
