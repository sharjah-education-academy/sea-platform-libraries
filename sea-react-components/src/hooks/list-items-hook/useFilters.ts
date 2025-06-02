import { useEffect, useMemo } from "react";
import { DEFAULT_FILTER_VALUE, Filter } from "./types";

export function useFilters<K>(
  name: string,
  filters: Filter<K>[],
  updateParams?: (updates: Record<string, string>) => void,
  getParam?: (name: string) => string | null | undefined
) {
  const paramNames = useMemo(() => {
    return filters.reduce((acc, f) => {
      acc[f.name] = `${name}-${f.name}`;
      return acc;
    }, {} as Record<string, string>);
  }, [filters, name]);

  // Batch update URL when filters change
  useEffect(() => {
    if (updateParams && getParam) {
      const updates: Record<string, string> = {};

      filters.forEach((f) => {
        const key = paramNames[f.name];
        const current = getParam(key);
        const next = String(f.value);
        if (current !== next) {
          updates[key] = next;
        }
      });

      if (Object.keys(updates).length > 0) {
        updateParams(updates);
      }
    }
  }, [filters.map((f) => `${f.name}:${f.value}`).join("|")]);

  // Initialize from URL
  useEffect(() => {
    if (getParam) {
      filters.forEach((f) => {
        const val = getParam(paramNames[f.name]);
        f.setValue(val ? (val as K) : (DEFAULT_FILTER_VALUE as K));
      });
    }
  }, []);
}
