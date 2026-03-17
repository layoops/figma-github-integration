import type {
  Issue,
  IssueTimelineItems,
  Milestone,
  ProjectV2Item,
  PullRequestTimelineItems,
} from '@octokit/graphql-schema';

import { formatDate, openPluginUI } from '../../../../shared/lib/helpers';
import { useCheckImportedIssue } from '../../../../shared/lib/hooks';
import { iconStyles } from '../../../../shared/styles';
import {
  Button,
  CustomText,
  IssueContentBody,
  IssueStateLabel,
} from '../../../../shared/ui/components';
import {
  IconIssueOpened,
  IconMilestone,
  IconProjects,
  IconPullRequestOpened,
} from '../../../../shared/ui/icons';
import { AutoLayout, SVG } from '../../../../widget-components';

interface IssueRelativesSectionProps extends AutoLayoutProps {
  content: {
    timelineItems?: PullRequestTimelineItems[] | IssueTimelineItems[];
    projectItems?: ProjectV2Item[];
    milestone?: Milestone;
  };
  githubEntityType: 'issue' | 'pull-request';
}

export const IssueRelativesSection = ({
  content,
  githubEntityType,
  ...rest
}: IssueRelativesSectionProps) => {
  const { checkIfExistIssueWidget } = useCheckImportedIssue(
    githubEntityType === 'issue' ? 'pull-request' : 'issue'
  );
  const openLinkIssueUI = async (issue: Issue) => {
    const existingGithubIssueWidget = await checkIfExistIssueWidget({
      data: issue,
    });

    !existingGithubIssueWidget &&
      openPluginUI({
        routeName: 'import',
        props: {
          issueUrl: issue.url,
        },
        options: {
          visible: true,
        },
      });
  };

  return (
    <IssueContentBody direction="vertical" {...rest} spacing={22}>
      {content.timelineItems?.length > 0 && (
        <IssueContentBody padding={0} spacing={12} direction="vertical">
          {githubEntityType === 'issue' ? (
            <AutoLayout spacing={8} verticalAlignItems="center">
              <SVG
                width={iconStyles.sizing.small}
                height={iconStyles.sizing.small}
                src={IconPullRequestOpened()}
              />
              <CustomText size="extra-small" fontWeight={600}>
                Related PR
              </CustomText>
            </AutoLayout>
          ) : (
            <AutoLayout spacing={8} verticalAlignItems="center">
              <SVG
                width={iconStyles.sizing.small}
                height={iconStyles.sizing.small}
                src={IconIssueOpened()}
              />
              <CustomText size="extra-small" fontWeight={600}>
                Related Issues
              </CustomText>
            </AutoLayout>
          )}
          <IssueContentBody cornerRadius={0} padding={0} wrap direction="horizontal">
            {content.timelineItems?.map((item: IssueTimelineItems | PullRequestTimelineItems) => {
              return (
                item.__typename === 'ConnectedEvent' && (
                  <Button
                    leftChildren={
                      <IssueStateLabel
                        type={item.subject.__typename === 'Issue' ? 'Issue' : 'PullRequest'}
                        iconOnly={true}
                        state={item.subject.state ?? 'DRAFT'}
                      />
                    }
                    onClick={() => {
                      openLinkIssueUI(item.subject as Issue);
                    }}
                    appearance="secondary"
                    size="extra-small"
                    key={(item.subject.title ?? item) + 'linkedIssue'}
                    text={item.subject.title}
                  />
                )
              );
            })}
          </IssueContentBody>
        </IssueContentBody>
      )}
      {content.projectItems?.length > 0 && (
        <IssueContentBody cornerRadius={0} padding={0} spacing={12} direction="vertical">
          <AutoLayout spacing={8} verticalAlignItems="center">
            <SVG
              width={iconStyles.sizing.small}
              height={iconStyles.sizing.small}
              src={IconProjects()}
            />
            <CustomText size="extra-small" fontWeight={600}>
              Projects
            </CustomText>
          </AutoLayout>
          <IssueContentBody cornerRadius={0} padding={0} wrap direction="horizontal">
            {content.projectItems?.map((projectItem, index) => (
              <Button
                onClick={() => {}}
                href={projectItem.project.url}
                appearance="secondary"
                size="extra-small"
                key={projectItem.project.title ?? index}
                text={projectItem.project.title}
              />
            ))}
          </IssueContentBody>
        </IssueContentBody>
      )}
      {content.milestone && (
        <IssueContentBody cornerRadius={0} padding={0} spacing={12} direction="vertical">
          <AutoLayout spacing={8} verticalAlignItems="center">
            <SVG
              width={iconStyles.sizing.small}
              height={iconStyles.sizing.small}
              src={IconMilestone()}
            />
            <CustomText size="extra-small" fontWeight={600}>
              Milestone
            </CustomText>
          </AutoLayout>
          <IssueContentBody cornerRadius={0} padding={0} wrap direction="horizontal">
            <AutoLayout spacing={8} width={'fill-parent'}>
              <CustomText href={content.milestone.url} width="fill-parent" size="extra-small">
                {content?.milestone.title}
              </CustomText>
              {content.milestone.dueOn ? (
                <CustomText size="extra-small" width="hug-contents">
                  {formatDate({ value: content.milestone.dueOn })}
                </CustomText>
              ) : undefined}
            </AutoLayout>
          </IssueContentBody>
        </IssueContentBody>
      )}
    </IssueContentBody>
  );
};
