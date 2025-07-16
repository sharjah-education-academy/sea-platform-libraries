import { useEffect, useRef } from "react";

export function usePagination(
  name: string,
  page: number,
  setPage: (page: number) => void,
  rowsPerPage: number,
  setRowsPerPage: (val: number) => void,
  updateParams?: (updates: Record<string, string>) => void,
  getParam?: (name: string) => string | null | undefined
) {
  const initializedRef = useRef(false);

  const pageParam = `${name}-page`;
  const rowsParam = `${name}-rows`;

  useEffect(() => {
    if (updateParams && getParam) {
      const updates: Record<string, string> = {};
      const currentPage = getParam(pageParam);
      const currentRows = getParam(rowsParam);

      if (String(page) !== currentPage) {
        updates[pageParam] = String(page);
      }

      if (String(rowsPerPage) !== currentRows) {
        updates[rowsParam] = String(rowsPerPage);
      }

      if (Object.keys(updates).length > 0) {
        updateParams(updates);
      }
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (getParam && !initializedRef.current) {
      const defaultPage = Number(getParam(pageParam)) || page;
      const defaultRows = Number(getParam(rowsParam)) || rowsPerPage;
      setPage(defaultPage);
      setRowsPerPage(defaultRows);
      initializedRef.current = true;
    }
  }, []);
}
