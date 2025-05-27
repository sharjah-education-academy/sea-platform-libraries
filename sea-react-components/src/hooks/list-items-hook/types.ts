export interface Option<T> {
  value: T;
  label: string;
}

export type Filter<K> = {
  name: string;
  label?: string | undefined;
  options: Option<K>[];
  value: K;
  setValue: (newValue: K) => void;
};

export type BulkActionFeature = {
  selectedRowIds: string[];
  setSelectedRowIds: (ids: string[]) => void;
  bulkActions: React.ButtonHTMLAttributes<HTMLButtonElement>[];
};

export const DEFAULT_FILTER_VALUE = "all";
