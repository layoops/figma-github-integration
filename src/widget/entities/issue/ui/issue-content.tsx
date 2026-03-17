import type { DraftIssue, Issue } from '@octokit/graphql-schema';

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
} from './issue-sections';

interface IssueFieldsProps extends AutoLayoutProps {
  issue: Issue | DraftIssue;
}

type IssueTypes = 'Overview' | 'Body' | 'Comments' | 'Relatives';

export const IssueContent = ({ issue, ...rest }: IssueFieldsProps) => {
  const [selectedTab, setSelectedTab] = useSyncedState<IssueTypes>('issueContentTab', 'Overview');

  const [issueTabs] = useSyncedState<IssueTypes[]>('issueTabs', () => {
    const tabs: IssueTypes[] = ['Overview'];
    if (issue?.bodyText?.length > 0) {
      tabs.push('Body');
    }
    if (issue.__typename === 'Issue' && issue?.comments?.nodes?.length > 0) {
      tabs.push('Comments');
    }
    if (
      issue.__typename === 'Issue' &&
      (issue?.timelineItems?.nodes?.length > 0 ||
        issue?.projectItems?.nodes?.length > 0 ||
        issue?.milestone)
    ) {
      tabs.push('Relatives');
    }
    return tabs;
  });

  return (
    <IssueContentWrapper {...rest}>
      <TabGroup
        padding={{ horizontal: 12 }}
        tabs={issueTabs}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
      />
      <AutoLayout padding={12} spacing={12} direction="vertical" width="fill-parent">
        <IssueOverviewSection hidden={selectedTab !== 'Overview'} issue={issue} />
        {issue?.bodyText ? (
          <IssueBodySection
            id={issue.id}
            type="body"
            hidden={selectedTab !== 'Body'}
            content={issue?.bodyText}
            header={{
              left: {
                text: 'Description',
              },
              right: {
                text: formatDate({ value: issue?.updatedAt }),
                icon: {
                  url: issue.__typename === 'Issue' ? issue.url : null,
                  src: IconExternal(Colors.black),
                },
              },
            }}
          />
        ) : undefined}
        {issue.__typename === 'Issue' && issue?.comments?.nodes ? (
          <IssueCommentsSection
            hidden={selectedTab !== 'Comments'}
            issueUrl={issue.url}
            comments={issue.comments}
          />
        ) : undefined}
        {issue.__typename === 'Issue' ? (
          <IssueRelativesSection
            hidden={selectedTab !== 'Relatives'}
            content={{
              timelineItems: issue?.timelineItems?.nodes,
              projectItems: issue?.projectItems?.nodes,
              milestone: issue?.milestone,
            }}
            githubEntityType="issue"
          />
        ) : undefined}
      </AutoLayout>
    </IssueContentWrapper>
  );
};
