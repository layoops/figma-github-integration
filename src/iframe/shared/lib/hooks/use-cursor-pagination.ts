import type { PageInfo } from '@octokit/graphql-schema';

import { useCallback, useState } from 'react';

type UseCursorPaginationProps = {
  defaultCursor?: string;
  onCursorChange?: (cursor: string | undefined) => void;
};

export const useCursorPagination = ({ onCursorChange }: UseCursorPaginationProps = {}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [cursorHistory, setCursorHistory] = useState<Record<number, string>>({});
  // Increments on every handlePageChange call (including rejected ones).
  // Used as part of the pagination component's key to force a remount when
  // navigation is rejected, resetting the uncontrolled Primer pagination to
  // the confirmed page instead of the prematurely-advanced visual state.
  const [paginationVersion, setPaginationVersion] = useState(0);

  const handlePageChange = useCallback(
    (nextPageIndex: number, pageInfo?: Partial<PageInfo>) => {
      setPaginationVersion((v) => v + 1);

      if (nextPageIndex > pageIndex) {
        const nextCursor = pageInfo?.endCursor ?? undefined;

        // Guard: if there's no cursor, data for the current page hasn't loaded yet.
        // Ignore the click to prevent race conditions when rapidly flipping pages.
        if (!nextCursor) return;

        setCursorHistory((prev) => ({ ...prev, [nextPageIndex]: nextCursor }));
        setCursor(nextCursor);
        onCursorChange?.(nextCursor);
      } else if (nextPageIndex < pageIndex) {
        const prevCursor = nextPageIndex === 0 ? undefined : cursorHistory[nextPageIndex];

        setCursor(prevCursor);
        onCursorChange?.(prevCursor);
      }

      setPageIndex(nextPageIndex);
    },
    [pageIndex, cursorHistory, onCursorChange]
  );

  const resetPagination = useCallback(() => {
    setPageIndex(0);
    setCursor(undefined);
    setCursorHistory({});
    setPaginationVersion((v) => v + 1);
  }, []);

  return {
    pageIndex,
    cursor,
    handlePageChange,
    resetPagination,
    paginationVersion,
  };
};
