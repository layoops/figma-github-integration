import type { IframeTranslationKey } from '@/global-shared/localization';
import type { ContentSettings } from '@/shared/lib/types/application-settings';
import type { DraftIssue, Issue, PullRequest } from '@octokit/graphql-schema';
import type { Icon } from '@primer/octicons-react';

import { Activity, useMemo, useState } from 'react';
import { GitPullRequestIcon, IssueOpenedIcon } from '@primer/octicons-react';
import { Button, UnderlineNav } from '@primer/react';
import { useParams } from '@tanstack/react-router';

import { IssuesTable } from '@/entities/issue';
import { useGitHubProject } from '@/entities/project';
import { PullRequestsTable } from '@/entities/pull-request';
import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { useSelection } from '@/shared/lib/hooks/use-selection';
import { sendMessageToWidget } from '@/shared/lib/utils';
import { CheckboxField, Loader } from '@/shared/ui';
import { PageContentLayout } from '@/widgets/page-content-layout';

import { toProjectWidgetData } from '../lib/to-project-widget-data';

type IssueFilterState = 'OPEN' | 'CLOSED' | 'DRAFT';
type PullRequestFilterState = 'OPEN' | 'CLOSED' | 'MERGED';

const applyIssueSettings = (
  entity: Issue | DraftIssue,
  settings: ContentSettings
): Issue | DraftIssue => {
  if (entity.__typename !== 'Issue') return entity;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = { ...entity };
  if (!settings.includeLabels) {
    result.labels = null;
  }
  if (!settings.includeMilestone) {
    result.milestone = null;
  }
  if (!settings.includeComments) {
    result.comments = null;
  }
  if (!settings.includeDevelopment) {
    result.timelineItems = null;
  }
  if (!settings.includeAssignees) {
    result.assignees = null;
  }
  if (!settings.includeProjects) {
    result.projectItems = null;
  }
  return result as Issue;
};

const applyPullRequestSettings = (pr: PullRequest, settings: ContentSettings): PullRequest => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = { ...pr };
  if (!settings.includeLabels) {
    result.labels = null;
  }
  if (!settings.includeMilestone) {
    result.milestone = null;
  }
  if (!settings.includeComments) {
    result.comments = null;
  }
  if (!settings.includeDevelopment) {
    result.timelineItems = null;
  }
  if (!settings.includeAssignees) {
    result.assignees = null;
  }
  if (!settings.includeProjects) {
    result.projectItems = null;
  }
  return result as PullRequest;
};

type NavigationTab = 'Issues' | 'Pull Requests';

const tabs: {
  text: NavigationTab;
  icon: Icon;
  translationKey: IframeTranslationKey;
  isActiveMatchPattern: string;
}[] = [
  {
    text: 'Issues',
    icon: IssueOpenedIcon,
    translationKey: 'repoPages.navigation.issues',
    isActiveMatchPattern: ROUTES_MAP[ROUTES.REPO_ISSUES] + '/*',
  },
  {
    text: 'Pull Requests',
    icon: GitPullRequestIcon,
    translationKey: 'repoPages.navigation.pullRequests',
    isActiveMatchPattern: ROUTES_MAP[ROUTES.REPO_PULL_REQUESTS] + '/*',
  },
];

export const ProjectPage = () => {
  const { t } = useTranslation();
  const { applicationSettings } = useAppContext();
  const params = useParams({ from: '/_layout/_protected/project/$id' });

  const [activeTab, setActiveTab] = useState<NavigationTab>('Issues');

  const { data, isLoading } = useGitHubProject({ id: params.id });

  const allIssues = useMemo(
    () =>
      (data?.items.nodes
        ?.filter((node) => node?.type === 'ISSUE' || node?.type === 'DRAFT_ISSUE')
        .map((node) => node?.content)
        .filter(Boolean) ?? []) as (Issue | DraftIssue)[],
    [data]
  );

  const allPullRequests = useMemo(
    () =>
      (data?.items.nodes
        ?.filter((node) => node?.type === 'PULL_REQUEST')
        .map((node) => node?.content)
        .filter(Boolean) ?? []) as PullRequest[],
    [data]
  );

  const [currentIssueFilter, setCurrentIssueFilter] = useState<IssueFilterState>('OPEN');

  const [currentPullRequestFilter, setCurrentPullRequestFilter] =
    useState<PullRequestFilterState>('OPEN');

  const [importWithProject, setImportWithProject] = useState(true);

  const issuesSelection = useSelection();
  const pullRequestsSelection = useSelection();

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);

    issuesSelection.clear();
    pullRequestsSelection.clear();
  };

  const filteredIssues = useMemo(() => {
    if (currentIssueFilter === 'DRAFT') {
      return allIssues.filter((i) => i.__typename === 'DraftIssue');
    }
    if (currentIssueFilter === 'OPEN') {
      return allIssues.filter((i) => i.__typename === 'Issue' && i.state === 'OPEN');
    }
    if (currentIssueFilter === 'CLOSED') {
      return allIssues.filter((i) => i.__typename === 'Issue' && i.state === 'CLOSED');
    }
    return allIssues;
  }, [allIssues, currentIssueFilter]);

  const filteredPullRequests = useMemo(() => {
    return allPullRequests.filter((pr) => pr.state === currentPullRequestFilter);
  }, [allPullRequests, currentPullRequestFilter]);

  const issueCounts = useMemo(() => {
    const normalized = allIssues ?? [];

    const openedIssuesCount = normalized.filter(
      (i) => i.__typename === 'Issue' && i.state === 'OPEN'
    ).length;
    const closedIssuesCount = normalized.filter(
      (i) => i.__typename === 'Issue' && i.state === 'CLOSED'
    ).length;
    const draftIssuesCount = normalized.filter((i) => i.__typename === 'DraftIssue').length;

    let currentTotalCount = 0;
    if (currentIssueFilter === 'OPEN') {
      currentTotalCount = openedIssuesCount;
    } else if (currentIssueFilter === 'CLOSED') {
      currentTotalCount = closedIssuesCount;
    } else if (currentIssueFilter === 'DRAFT') {
      currentTotalCount = draftIssuesCount;
    } else {
      currentTotalCount = normalized.length;
    }

    return {
      totalCount: currentTotalCount,
      openedIssuesCount,
      closedIssuesCount,
      draftIssuesCount,
    };
  }, [allIssues, currentIssueFilter]);

  const pullRequestsCounts = useMemo(() => {
    const normalized = allPullRequests ?? [];

    const openCount = normalized.filter((pr) => pr.state === 'OPEN').length;
    const closedCount = normalized.filter((pr) => pr.state === 'CLOSED').length;
    const mergedCount = normalized.filter((pr) => pr.state === 'MERGED').length;

    let currentTotalCount = 0;
    if (currentPullRequestFilter === 'OPEN') {
      currentTotalCount = openCount;
    } else if (currentPullRequestFilter === 'CLOSED') {
      currentTotalCount = closedCount;
    } else if (currentPullRequestFilter === 'MERGED') {
      currentTotalCount = mergedCount;
    } else {
      currentTotalCount = normalized.length;
    }

    return {
      totalCount: currentTotalCount,
      openCount,
      closedCount,
      mergedCount,
    };
  }, [allPullRequests, currentPullRequestFilter]);

  const handleImportToProject = () => {
    const shouldKeepOpen = importWithProject && Boolean(data);

    if (activeTab === 'Issues') {
      const selected = allIssues
        .filter((i) => issuesSelection.selectedSet.has(i.id))
        .map((i) => (applicationSettings ? applyIssueSettings(i, applicationSettings.issue) : i));
      sendMessageToWidget({
        type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUES,
        data: selected,
        closeAfterImport: !shouldKeepOpen,
      });
    } else {
      const selected = allPullRequests
        .filter((pr) => pullRequestsSelection.selectedSet.has(pr.id))
        .map((pr) =>
          applicationSettings ? applyPullRequestSettings(pr, applicationSettings.pullRequest) : pr
        );
      sendMessageToWidget({
        type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUES,
        data: selected,
        closeAfterImport: !shouldKeepOpen,
      });
    }

    if (importWithProject && data) {
      sendMessageToWidget({
        type: MESSAGE_TYPES.IMPORT_GITHUB_PROJECT,
        data: { project: toProjectWidgetData(data) },
      });
    }
  };

  return (
    <PageContentLayout
      title={t('projectPage.title')}
      navigation={
        <UnderlineNav>
          {tabs.map((tab) => {
            const isActive = tab.text === activeTab;
            return (
              <UnderlineNav.Item
                key={tab.text}
                icon={tab.icon}
                aria-selected={isActive}
                onSelect={() => handleTabChange(tab.text)}
              >
                {t(tab.translationKey)}
              </UnderlineNav.Item>
            );
          })}
        </UnderlineNav>
      }
      footerLeft={
        <CheckboxField
          checked={importWithProject}
          onChange={(e) => setImportWithProject(e)}
          label="Import with Project"
        />
      }
      footerRight={
        <Button
          variant="primary"
          disabled={
            activeTab === 'Issues'
              ? !issuesSelection.hasSelection
              : !pullRequestsSelection.hasSelection
          }
          count={
            activeTab === 'Issues'
              ? issuesSelection.count || undefined
              : pullRequestsSelection.count || undefined
          }
          onClick={handleImportToProject}
        >
          {t('projectPage.footerActions.import.title')}
        </Button>
      }
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Activity mode={activeTab === 'Issues' ? 'visible' : 'hidden'}>
            <IssuesTable
              issues={filteredIssues}
              counts={issueCounts}
              pageSize={filteredIssues.length}
              pageIndex={0}
              onPageChange={() => {}}
              activeFilter={currentIssueFilter}
              onFilterChange={(filter) => {
                setCurrentIssueFilter(filter);
                issuesSelection.clear();
              }}
              selectedIds={issuesSelection.selectedIds}
              onSelectionChange={issuesSelection.setSelected}
            />
          </Activity>

          <Activity mode={activeTab === 'Pull Requests' ? 'visible' : 'hidden'}>
            <PullRequestsTable
              pullRequests={filteredPullRequests}
              counts={pullRequestsCounts}
              pageSize={filteredPullRequests.length}
              pageIndex={0}
              onPageChange={() => {}}
              activeFilter={currentPullRequestFilter}
              onFilterChange={(filter) => {
                setCurrentPullRequestFilter(filter);
                pullRequestsSelection.clear();
              }}
              selectedIds={pullRequestsSelection.selectedIds}
              onSelectionChange={pullRequestsSelection.setSelected}
            />
          </Activity>
        </>
      )}
    </PageContentLayout>
  );
};
