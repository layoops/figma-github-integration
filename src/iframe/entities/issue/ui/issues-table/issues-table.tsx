import type { IframeTranslationKey } from '@/global-shared/localization';
import type { DraftIssue, Issue } from '@octokit/graphql-schema';

import { useMemo } from 'react';
import { Button, RelativeTime, Text } from '@primer/react';
import { useNavigate } from '@tanstack/react-router';

import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { useTranslation } from '@/shared/lib/contexts';
import { EmptyTableRow, EntityCell, EntityTable } from '@/shared/ui';
import { EntityListHeader } from '@/shared/ui/entity-list-header/entity-list-header';

type IssueStateFilter = 'OPEN' | 'CLOSED' | 'DRAFT';

type IssuesTableProps = {
  issues: (Issue | DraftIssue | null | undefined)[];
  counts?: {
    totalCount?: number;
    openedIssuesCount?: number;
    closedIssuesCount?: number;
    draftIssuesCount?: number;
  };
  pageSize: number;
  pageIndex: number;
  onPageChange: (pageIndex: number) => void;
  activeFilter: IssueStateFilter;
  onFilterChange: (filter: IssueStateFilter) => void;
  isLoading?: boolean;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  defaultTargetUrl?: string;
  paginationVersion?: number;
};

export const IssuesTable = ({
  issues,
  counts,
  pageSize,
  pageIndex,
  onPageChange,
  activeFilter,
  onFilterChange,
  isLoading,
  selectedIds,
  onSelectionChange,
  defaultTargetUrl,
  paginationVersion,
}: IssuesTableProps) => {
  const { t, locale } = useTranslation();
  const navigate = useNavigate();

  const normalizedIssues = useMemo(
    () => issues.filter((i): i is Issue | DraftIssue => i != null),
    [issues]
  );

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const handleRowToggle = (id: string) => {
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(Array.from(next));
  };

  const handlePageToggle = (checked: boolean) => {
    const next = new Set(selectedSet);
    normalizedIssues.forEach((row) => {
      checked ? next.add(row.id) : next.delete(row.id);
    });
    onSelectionChange(Array.from(next));
  };

  const handleUnselectAll = () => onSelectionChange([]);

  const renderIssueRow = (issue: Issue | DraftIssue) => (
    <EntityCell
      key={issue.id}
      title={issue.title}
      state={
        issue.__typename === 'DraftIssue'
          ? 'DRAFT'
          : issue.__typename === 'Issue'
            ? issue?.state
            : undefined
      }
      labels={issue.__typename === 'Issue' ? issue?.labels?.nodes : []}
      target="issue"
      link={{ to: '/issue/$id', params: { id: issue.id } }}
      bottomContent={
        issue.__typename === 'Issue' && (
          <Text size="small">
            #{issue?.number} • {t('entity.issue.table.entityRow.openedByText')}{' '}
            {issue?.author?.login ?? t('entity.issue.table.entityRow.unknownAuthor')}{' '}
            {issue.createdAt && <RelativeTime lang={locale} date={new Date(issue.createdAt)} />}
          </Text>
        )
      }
    />
  );

  return (
    <EntityTable<Issue | DraftIssue>
      isLoading={isLoading}
      paginationVersion={paginationVersion}
      title={t('entity.issue.table.title')}
      data={normalizedIssues.length === 0 ? [{} as Issue] : normalizedIssues}
      totalCount={counts?.totalCount}
      pageSize={pageSize}
      currentPageIndex={pageIndex}
      onPageChange={onPageChange}
      selection={{
        selectedIds: selectedSet,
        disabled: normalizedIssues.length === 0,
        onToggle: handleRowToggle,
        onTogglePage: handlePageToggle,
        ariaLabelGenerator: (i) => (i?.__typename === 'Issue' ? `#${i.number}` : ''),
      }}
      renderRow={(row) =>
        normalizedIssues.length === 0 ? (
          <EmptyTableRow
            title={t(
              activeFilter === 'CLOSED'
                ? 'entity.issue.table.emptyState.noClosedItems'
                : 'entity.issue.table.emptyState.noOpenItems'
            )}
          />
        ) : (
          renderIssueRow(row)
        )
      }
      mainHeaderContent={
        <EntityListHeader<IssueStateFilter>
          totalCount={counts?.totalCount}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          selectedCount={selectedIds.length}
          onUnselectAll={handleUnselectAll}
          selectionTranslationKey="entity.issue.table.selection.stats"
          options={[
            {
              key: 'OPEN' as const,
              labelKey: 'entity.issue.table.header.filters.opened.title' as IframeTranslationKey,
              count: counts?.openedIssuesCount,
            },
            {
              key: 'DRAFT' as const,
              labelKey: 'entity.issue.table.header.filters.draft.title' as IframeTranslationKey,
              count: counts?.draftIssuesCount,
            },
            {
              key: 'CLOSED' as const,
              labelKey: 'entity.issue.table.header.filters.closed.title' as IframeTranslationKey,
              count: counts?.closedIssuesCount,
            },
          ].filter((opt) => opt.key !== 'DRAFT' || (counts?.draftIssuesCount || 0) > 0)}
        />
      }
      actions={
        <Button
          size="small"
          variant="primary"
          onClick={() =>
            navigate({
              to: ROUTES_MAP[ROUTES.ISSUE_CREATE],
              search: { target: defaultTargetUrl },
            })
          }
        >
          {t('links.newIssue.title')}
        </Button>
      }
    />
  );
};
