import { useCallback, useState } from 'react';
import { Button } from '@primer/react';
import { getRouteApi } from '@tanstack/react-router';

import { IssuesTable } from '@/entities/issue';
import { useGitHubRepoIssues, useGitHubRepoIssuesCounts } from '@/entities/repository';
import { useImportSelectedNodesToFigma } from '@/features/import';
import { useTranslation } from '@/shared/lib/contexts';
import { useCursorPagination } from '@/shared/lib/hooks/use-cursor-pagination';
import { useSelection } from '@/shared/lib/hooks/use-selection';
import { Loader } from '@/shared/ui';
import { RepoFooterRightPortal } from '@/widgets/repo-layout';

const DEFAULT_PER_PAGE = 10;
const routeApi = getRouteApi('/_layout/_protected/repo/$id/issues');

export const RepoIssuesPage = () => {
  const { id } = routeApi.useParams();
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] = useState<'OPEN' | 'CLOSED'>('OPEN');

  const { pageIndex, cursor, handlePageChange, resetPagination, paginationVersion } =
    useCursorPagination();

  const { selectedIds, setSelected, count: selectedCount } = useSelection();

  const { importItems, isImporting } = useImportSelectedNodesToFigma('ISSUES');

  const repoIssuesQuery = useGitHubRepoIssuesCounts({ repoId: id });

  const githubRepoIssuesQuery = useGitHubRepoIssues({
    repoId: id,
    issueStates: [activeFilter],
    perPage: DEFAULT_PER_PAGE,
    startCursor: cursor,
    pageIndex,
  });

  const { data } = githubRepoIssuesQuery;

  const handleFilterChange = useCallback(
    (filter: 'OPEN' | 'CLOSED' | 'DRAFT') => {
      if (filter === 'DRAFT') return;
      setActiveFilter(filter);
      resetPagination();
      setSelected([]);
    },
    [resetPagination, setSelected]
  );

  const handleImportClick = () => {
    importItems(selectedIds);
  };

  const isLoading = githubRepoIssuesQuery.isLoading || repoIssuesQuery.isLoading;

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <>
          <IssuesTable
            issues={data.issues}
            counts={{
              totalCount: data.totalCount,
              openedIssuesCount: repoIssuesQuery.data?.openIssuesCount.totalCount,
              closedIssuesCount: repoIssuesQuery.data?.closedIssuesCount.totalCount,
            }}
            pageSize={DEFAULT_PER_PAGE}
            pageIndex={pageIndex}
            isLoading={githubRepoIssuesQuery.isFetching}
            onPageChange={(idx) => handlePageChange(idx, data.pageInfo)}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            selectedIds={selectedIds}
            onSelectionChange={setSelected}
            paginationVersion={paginationVersion}
          />

          <RepoFooterRightPortal>
            <Button
              variant="primary"
              disabled={selectedCount === 0 || isImporting}
              aria-busy={isImporting}
              loading={isImporting}
              count={selectedCount || undefined}
              onClick={handleImportClick}
            >
              {t('repoIssuesPage.footerActions.import.title')}
            </Button>
          </RepoFooterRightPortal>
        </>
      )}
    </>
  );
};
