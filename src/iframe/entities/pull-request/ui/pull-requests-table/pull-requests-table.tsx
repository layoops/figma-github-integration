import type { PullRequest } from '@octokit/graphql-schema';

import { useMemo } from 'react';
import { RelativeTime, Text } from '@primer/react';

import { useTranslation } from '@/shared/lib/contexts';
import { EmptyTableRow, EntityCell, EntityTable } from '@/shared/ui';
import { EntityListHeader } from '@/shared/ui/entity-list-header/entity-list-header';

type PRStateFilter = 'OPEN' | 'CLOSED' | 'MERGED';

export type PullRequestsTableProps = {
  pullRequests: (PullRequest | null | undefined)[];
  counts?: {
    totalCount?: number;
    openCount?: number;
    closedCount?: number;
    mergedCount?: number;
  };
  pageSize: number;
  pageIndex: number;
  onPageChange: (pageIndex: number) => void;
  isLoading?: boolean;

  activeFilter: PRStateFilter;
  onFilterChange: (state: PRStateFilter) => void;

  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  paginationVersion?: number;
};

export const PullRequestsTable = ({
  pullRequests,
  counts,
  pageSize,
  pageIndex,
  onPageChange,
  isLoading,
  activeFilter,
  onFilterChange,
  selectedIds,
  onSelectionChange,
  paginationVersion,
}: PullRequestsTableProps) => {
  const { t, locale } = useTranslation();

  const normalizedPRs = useMemo(
    () => pullRequests.filter((pr): pr is PullRequest => pr != null),
    [pullRequests]
  );

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const handleUnselectAll = () => onSelectionChange([]);
  const handleRowToggle = (id: string) => {
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(Array.from(next));
  };
  const handlePageToggle = (checked: boolean) => {
    const next = new Set(selectedSet);
    normalizedPRs.forEach((pr) => (checked ? next.add(pr.id) : next.delete(pr.id)));
    onSelectionChange(Array.from(next));
  };

  const renderPullRequestRow = (pullRequest: PullRequest) => (
    <EntityCell
      key={pullRequest.id}
      title={pullRequest.title}
      state={pullRequest.state}
      labels={pullRequest.labels?.nodes ?? []}
      target="pull-request"
      link={{ to: '/pull-request/$id', params: { id: pullRequest.id } }}
      bottomContent={
        <Text size="small">
          #{pullRequest.number} • {t('entity.pullRequest.table.entityRow.openedByText')}{' '}
          {pullRequest.author?.login ?? t('entity.pullRequest.table.entityRow.unknownAuthor')}{' '}
          {pullRequest.createdAt && (
            <RelativeTime lang={locale} date={new Date(pullRequest.createdAt)} />
          )}
        </Text>
      }
    />
  );

  return (
    <EntityTable<PullRequest>
      isLoading={isLoading}
      paginationVersion={paginationVersion}
      title={t('entity.pullRequest.table.title')}
      data={normalizedPRs.length === 0 ? [{} as PullRequest] : normalizedPRs}
      totalCount={counts?.totalCount}
      pageSize={pageSize}
      currentPageIndex={pageIndex}
      onPageChange={onPageChange}
      selection={{
        selectedIds: selectedSet,
        disabled: normalizedPRs.length === 0,
        onToggle: handleRowToggle,
        onTogglePage: handlePageToggle,
        ariaLabelGenerator: (pr) => `#${pr.number}`,
      }}
      renderRow={(row) =>
        normalizedPRs.length === 0 ? (
          <EmptyTableRow
            title={t(
              activeFilter === 'CLOSED' || activeFilter === 'MERGED'
                ? 'entity.pullRequest.table.emptyState.noClosedItems'
                : 'entity.pullRequest.table.emptyState.noOpenItems'
            )}
          />
        ) : (
          renderPullRequestRow(row)
        )
      }
      mainHeaderContent={
        <EntityListHeader<PRStateFilter>
          totalCount={counts?.totalCount}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          selectedCount={selectedIds.length}
          onUnselectAll={handleUnselectAll}
          selectionTranslationKey="entity.pullRequest.table.selection.stats"
          options={[
            {
              key: 'OPEN',
              labelKey: 'entity.pullRequest.table.header.filters.opened.title',
              count: counts?.openCount,
            },
            {
              key: 'CLOSED',
              labelKey: 'entity.pullRequest.table.header.filters.closed.title',
              count: counts?.closedCount,
            },
            // { key: 'MERGED', labelKey: 'entity.pullRequest.table.header.filters.merged.title', count: counts?.mergedCount }
          ]}
        />
      }
    />
  );
};
