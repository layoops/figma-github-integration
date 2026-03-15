import { useCallback, useState } from 'react';
import { Button } from '@primer/react';
import { getRouteApi } from '@tanstack/react-router';

import { PullRequestsTable } from '@/entities/pull-request';
import { useGitHubRepoPullRequests, useGitHubRepoPullRequestsCounts } from '@/entities/repository';
import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { useTranslation } from '@/shared/lib/contexts';
import { useCursorPagination } from '@/shared/lib/hooks/use-cursor-pagination';
import { useSelection } from '@/shared/lib/hooks/use-selection';
import { sendMessageToWidget } from '@/shared/lib/utils';
import { Loader } from '@/shared/ui';
import { RepoFooterRightPortal } from '@/widgets/repo-layout';

const DEFAULT_PER_PAGE = 10;
const routeApi = getRouteApi('/_layout/_protected/repo/$id');

export const RepoPullRequestsPage = () => {
  const { id } = routeApi.useParams();
  const { t } = useTranslation();

  const [filterState, setFilterState] = useState<'OPEN' | 'CLOSED' | 'MERGED'>('OPEN');

  const { pageIndex, cursor, handlePageChange, resetPagination } = useCursorPagination();
  const {
    selectedIds,
    toggle: _toggle,
    toggleAll: _toggleAll,
    clear: clearSelection,
    count: selectedCount,
  } = useSelection();

  const countsQuery = useGitHubRepoPullRequestsCounts({ repoId: id });
  const pullRequestsQuery = useGitHubRepoPullRequests({
    repoId: id,
    states: [filterState],
    perPage: DEFAULT_PER_PAGE,
    startCursor: cursor,
    pageIndex,
  });

  const { data } = pullRequestsQuery;

  const handleFilterChange = useCallback(
    (newState: 'OPEN' | 'CLOSED' | 'MERGED') => {
      setFilterState(newState);
      resetPagination();
      clearSelection();
    },
    [resetPagination, clearSelection]
  );

  const onPageChange = (nextIndex: number) => {
    handlePageChange(nextIndex, data?.pageInfo);
  };

  const importPullRequests = () => {
    const selectedItems =
      data?.pullRequests.filter(
        (pr): pr is NonNullable<typeof pr> => pr != null && selectedIds.includes(pr.id)
      ) ?? [];

    selectedItems.forEach((pr) => {
      sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST, data: pr });
    });
  };

  const isLoading = pullRequestsQuery.isLoading || countsQuery.isLoading;

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <>
          <PullRequestsTable
            pullRequests={data.pullRequests}
            pageSize={DEFAULT_PER_PAGE}
            pageIndex={pageIndex}
            isLoading={pullRequestsQuery.isFetching}
            onPageChange={onPageChange}
            activeFilter={filterState}
            onFilterChange={handleFilterChange}
            selectedIds={selectedIds}
            onSelectionChange={(ids) => {
              if (ids.length === 0) clearSelection();
              else {
                clearSelection();
              }
            }}
          />
          <RepoFooterRightPortal>
            <Button
              variant="primary"
              disabled={selectedCount === 0}
              count={selectedCount > 0 ? selectedCount : undefined}
              onClick={importPullRequests}
            >
              {t('projectPage.footerActions.import.title')}
            </Button>
          </RepoFooterRightPortal>
        </>
      )}
    </>
  );
};
