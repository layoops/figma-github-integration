import type { PullRequest } from '@octokit/graphql-schema';

import { formatDate } from '../../../shared/lib/helpers';
import { Colors } from '../../../shared/styles';
import { IssueContentWrapper, TabGroup } from '../../../shared/ui/components';
import { IconExternal } from '../../../shared/ui/icons';
import { AutoLayout, useSyncedState } from '../../../widget-components';
import {
  IssueBodySection,
  IssueCommentsSection,
  IssueOverviewSection,
  IssueRelativesSection,
} from '../../issue/ui';

interface PullRequestContentProps extends AutoLayoutProps {
  pullRequest: PullRequest;
}

type PullRequestTabTypes = 'Overview' | 'Body' | 'Comments' | 'Relatives';

export const PullRequestContent = ({ pullRequest, ...rest }: PullRequestContentProps) => {
  const [selectedTab, setSelectedTab] = useSyncedState<PullRequestTabTypes>(
    'issueContentTab',
    'Overview'
  );

  const [pullRequestTabs] = useSyncedState<PullRequestTabTypes[]>('pullRequestTabs', () => {
    const tabs: PullRequestTabTypes[] = ['Overview'];
    if (pullRequest.bodyText.length) {
      tabs.push('Body');
    }
    if (pullRequest?.comments?.nodes?.length > 0) {
      tabs.push('Comments');
    }
    if (
      pullRequest?.timelineItems?.nodes?.length > 0 ||
      pullRequest?.projectItems?.nodes.length > 0 ||
      pullRequest?.milestone
    ) {
      tabs.push('Relatives');
    }
    return tabs;
  });

  return (
    <IssueContentWrapper {...rest}>
      <TabGroup
        padding={{ horizontal: 12 }}
        tabs={pullRequestTabs}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
      />
      <AutoLayout padding={12} spacing={12} direction="vertical" width="fill-parent">
        <IssueOverviewSection hidden={selectedTab !== 'Overview'} issue={pullRequest} />

        {Boolean(pullRequest.bodyText.length > 0) && (
          <IssueBodySection
            id={pullRequest.id}
            type="body"
            hidden={selectedTab !== 'Body'}
            content={pullRequest.bodyText}
            header={{
              left: {
                text: 'Description',
              },
              right: {
                text: formatDate({ value: pullRequest?.updatedAt }),
                icon: {
                  url: pullRequest.url,
                  src: IconExternal(Colors.black),
                },
              },
            }}
          />
        )}
        {pullRequest?.comments?.nodes.length > 0 ? (
          <IssueCommentsSection
            hidden={selectedTab !== 'Comments'}
            issueUrl={pullRequest.url}
            comments={pullRequest.comments}
          />
        ) : undefined}
        <IssueRelativesSection
          hidden={selectedTab !== 'Relatives'}
          content={{
            timelineItems: pullRequest?.timelineItems?.nodes,
            projectItems: pullRequest?.projectItems?.nodes,
            milestone: pullRequest?.milestone,
          }}
          githubEntityType="pull-request"
        />
      </AutoLayout>
    </IssueContentWrapper>
  );
};
