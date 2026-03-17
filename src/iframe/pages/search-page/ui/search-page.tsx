import type { IframeTranslationKey } from '@/global-shared/localization';
import type { Issue, PullRequest } from '@octokit/graphql-schema';
import type { Icon } from '@primer/octicons-react';

import { Activity, useMemo, useState } from 'react';
import { GitPullRequestIcon, IssueOpenedIcon } from '@primer/octicons-react';
import { Button, UnderlineNav } from '@primer/react';
import { getRouteApi } from '@tanstack/react-router';

import { IssuesTable, useGithubSearchQuery } from '@/entities/issue';
import { PullRequestsTable } from '@/entities/pull-request';
import { useImportSelectedNodesToFigma } from '@/features/import';
import { useTranslation } from '@/shared/lib/contexts';
import { useCursorPagination } from '@/shared/lib/hooks/use-cursor-pagination';
import { useSelection } from '@/shared/lib/hooks/use-selection';
import { Loader, StickyUnderlineNav } from '@/shared/ui';
import { PageContentLayout } from '@/widgets/page-content-layout';

const routeApi = getRouteApi('/_layout/_protected/search');
const DEFAULT_TABLE_PAGE_SIZE = 10;

type TabType = 'Issues' | 'Pull Requests';

const tabs: { text: TabType; icon: Icon; labelKey: IframeTranslationKey }[] = [
  { text: 'Issues', icon: IssueOpenedIcon, labelKey: 'repoPages.navigation.issues' },
  {
    text: 'Pull Requests',
    icon: GitPullRequestIcon,
    labelKey: 'repoPages.navigation.pullRequests',
  },
];

export const SearchPage = () => {
  const { t } = useTranslation();
  const { q: query = '' } = routeApi.useSearch();

  const [activeTab, setActiveTab] = useState<TabType>('Issues');
  const selection = useSelection();

  const { importItems: importIssues, isImporting: isImportingIssues } =
    useImportSelectedNodesToFigma('ISSUES');
  const { importItems: importPullRequests, isImporting: isImportingPRs } =
    useImportSelectedNodesToFigma('PULL_REQUESTS');

  const isImporting = isImportingIssues || isImportingPRs;

  const { pageIndex, cursor, handlePageChange } = useCursorPagination({
    onCursorChange: () => {
      selection.clear();
    },
  });

  const [issueFilter, setIssueFilter] = useState<'OPEN' | 'CLOSED' | 'DRAFT'>('OPEN');
  const [prFilter, setPrFilter] = useState<'OPEN' | 'CLOSED' | 'MERGED'>('OPEN');

  const { data, isLoading, isFetching } = useGithubSearchQuery({
    query,
    first: DEFAULT_TABLE_PAGE_SIZE,
    after: cursor,
  });

  const issues = useMemo(
    () =>
      (data?.items.filter((item) => item?.__typename === 'Issue') as (
        | Issue
        | null
        | undefined
      )[]) ?? [],
    [data]
  );

  const pullRequests = useMemo(
    () =>
      (data?.items.filter((item) => item?.__typename === 'PullRequest') as (
        | PullRequest
        | null
        | undefined
      )[]) ?? [],
    [data]
  );

  const displayedIssues = useMemo(() => {
    if (issueFilter === 'OPEN') {
      return issues.filter((i) => i?.state === 'OPEN');
    }
    if (issueFilter === 'CLOSED') {
      return issues.filter((i) => i?.state === 'CLOSED');
    }
    return issues;
  }, [issues, issueFilter]);

  const displayedPRs = useMemo(() => {
    if (prFilter === 'OPEN') {
      return pullRequests.filter((pr) => pr?.state === 'OPEN');
    }
    if (prFilter === 'CLOSED') {
      return pullRequests.filter((pr) => pr?.state === 'CLOSED');
    }
    if (prFilter === 'MERGED') {
      return pullRequests.filter((pr) => pr?.state === 'MERGED');
    }
    return pullRequests;
  }, [pullRequests, prFilter]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    selection.clear();
  };

  const handleImportClick = () => {
    if (activeTab === 'Issues') {
      importIssues(selection.selectedIds);
    } else {
      importPullRequests(selection.selectedIds);
    }
  };

  const footerRight = (
    <Button
      variant="primary"
      disabled={!selection.hasSelection || isImporting}
      aria-busy={isImporting}
      loading={isImporting}
      count={selection.count || undefined}
      onClick={handleImportClick}
    >
      {t('projectPage.footerActions.import.title')}
    </Button>
  );

  return (
    <PageContentLayout
      title={t('searchPage.title')}
      footerRight={footerRight}
      navigation={
        <StickyUnderlineNav>
          {tabs.map((tab) => (
            <UnderlineNav.Item
              key={tab.text}
              icon={tab.icon}
              aria-selected={activeTab === tab.text}
              onSelect={() => handleTabChange(tab.text)}
            >
              {t(tab.labelKey)}
            </UnderlineNav.Item>
          ))}
        </StickyUnderlineNav>
      }
    >
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <Activity mode={activeTab === 'Issues' ? 'visible' : 'hidden'}>
            <IssuesTable
              issues={displayedIssues}
              counts={{ totalCount: data?.totalCount }}
              pageSize={DEFAULT_TABLE_PAGE_SIZE}
              pageIndex={pageIndex}
              onPageChange={(idx) => handlePageChange(idx, data?.pageInfo)}
              activeFilter={issueFilter}
              onFilterChange={(f) => {
                setIssueFilter(f);
                selection.clear();
              }}
              isLoading={isFetching}
              selectedIds={selection.selectedIds}
              onSelectionChange={selection.setSelected}
            />
          </Activity>

          <Activity mode={activeTab === 'Pull Requests' ? 'visible' : 'hidden'}>
            <PullRequestsTable
              pullRequests={displayedPRs}
              counts={{ totalCount: data?.totalCount }}
              pageSize={DEFAULT_TABLE_PAGE_SIZE}
              pageIndex={pageIndex}
              onPageChange={(idx) => handlePageChange(idx, data?.pageInfo)}
              activeFilter={prFilter}
              onFilterChange={(f) => {
                setPrFilter(f);
                selection.clear();
              }}
              isLoading={isFetching}
              selectedIds={selection.selectedIds}
              onSelectionChange={selection.setSelected}
            />
          </Activity>

          {!isLoading && data?.items.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--fgColor-muted)' }}>
              No results found for query "{query}"
            </div>
          )}
        </>
      )}
    </PageContentLayout>
  );
};
