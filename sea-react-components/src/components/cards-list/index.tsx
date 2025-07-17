"use client";
import React from "react";
import Checkbox from "../checkbox";

import Loader from "../loader";
import { BulkActionFeature } from "../../hooks/list-items-hook/types";

export const DEFAULT_CARDS_LIST_ROWS_PER_PAGE_OPTIONS = [4, 8, 12, 16].map(
  (item) => ({
    label: item.toString(),
    value: item,
  })
);

export type Props<T> = {
  rows: ({ id: string } & T)[];
  bulkActionFeature?: BulkActionFeature | undefined;
  loading?: boolean;
  CardComponent?: React.FC<{ row: { id: string } & T }> | undefined;
};
export default function CardsList<T>({
  CardComponent,
  rows,
  bulkActionFeature,
  loading = false,
}: Props<T>) {
  return (
    <div className="py-1">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {rows.map((row) => (
            <div
              key={row.id}
              className="col-span-4 md:col-span-2 lg:col-span-1"
            >
              {bulkActionFeature && (
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
              )}
              {CardComponent && <CardComponent row={row} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
