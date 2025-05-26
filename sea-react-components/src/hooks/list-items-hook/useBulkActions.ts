import { useEffect } from "react";
import { BulkActionFeature, Filter } from "./types";

export function useBulkActions<K>(
  bulkActionFeature: BulkActionFeature | undefined,
  filters: Filter<K>[],
  query: string
) {
  useEffect(() => {
    if (bulkActionFeature) {
      bulkActionFeature.setSelectedRowIds([]);
    }
  }, [filters.map((f) => f.value).join("-"), query]);
}
