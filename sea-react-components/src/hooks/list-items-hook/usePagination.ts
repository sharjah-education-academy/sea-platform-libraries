import { useEffect } from "react";

export function usePagination(
  name: string,
  page: number,
  setPage: (page: number) => void,
  rowsPerPage: number,
  setRowsPerPage: (val: number) => void,
  updateParams?: (updates: Record<string, string>) => void,
  getParam?: (name: string) => string | null | undefined
) {
  const pageParam = `${name}-page`;
  const rowsParam = `${name}-rows`;

  useEffect(() => {
    if (updateParams) updateParams({ [pageParam]: String(page) });
  }, [page]);

  useEffect(() => {
    if (updateParams) updateParams({ [rowsParam]: String(rowsPerPage) });
  }, [rowsPerPage]);

  useEffect(() => {
    if (getParam) {
      const defaultPage = Number(getParam(pageParam)) || 1;
      const defaultRows = Number(getParam(rowsParam)) || 5;
      setPage(defaultPage);
      setRowsPerPage(defaultRows);
    }
  }, []);
}
