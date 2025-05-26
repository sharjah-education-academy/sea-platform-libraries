import { useEffect } from "react";
import { DEFAULT_FILTER_VALUE, Filter } from "./types";

export function useFilters<K>(
  name: string,
  filters: Filter<K>[],
  updateParams?: (updates: Record<string, string>) => void,
  getParam?: (name: string) => string | null | undefined
) {
  const paramNames = filters.reduce((acc, f) => {
    acc[f.name] = `${name}-${f.name}`;
    return acc;
  }, {} as Record<string, string>);

  // Update URL params when filters change
  useEffect(() => {
    if (updateParams) {
      const updated: Record<string, string> = {};
      filters.forEach((f) => {
        updated[paramNames[f.name]] = String(f.value);
      });
      updateParams(updated);
    }
  }, [filters.map((f) => f.value).join("-")]);

  // Set default filter values from URL on first render
  useEffect(() => {
    if (getParam) {
      filters.forEach((f) => {
        const val = getParam(paramNames[f.name]);
        f.setValue(val ? (val as K) : (DEFAULT_FILTER_VALUE as K));
      });
    }
  }, []);
}
