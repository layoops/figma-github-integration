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

  const handlePageChange = useCallback(
    (nextPageIndex: number, pageInfo?: Partial<PageInfo>) => {
      if (nextPageIndex > pageIndex) {
        const nextCursor = pageInfo?.endCursor ?? undefined;

        if (nextCursor) {
          setCursorHistory((prev) => ({ ...prev, [nextPageIndex]: nextCursor }));
        }

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
  }, []);

  return {
    pageIndex,
    cursor,
    handlePageChange,
    resetPagination,
  };
};
