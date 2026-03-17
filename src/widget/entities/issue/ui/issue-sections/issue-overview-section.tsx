import type { DraftIssue, Issue, PullRequest } from '@octokit/graphql-schema';

import { formatDate } from '../../../../shared/lib/helpers';
import { useModal } from '../../../../shared/lib/hooks';
import { presetColors } from '../../../../shared/styles';
import {
  Avatar,
  Button,
  CustomText,
  IssueContentBody,
  IssueField,
} from '../../../../shared/ui/components';
import { Fragment } from '../../../../widget-components';

interface IssueOverviewSectionProps extends AutoLayoutProps {
  issue: Issue | DraftIssue | PullRequest;
}

export const IssueOverviewSection = ({ issue, children, ...rest }: IssueOverviewSectionProps) => {
  const { assignees } = issue;
  const { openModal } = useModal();
  return (
    <IssueContentBody {...rest}>
      <IssueField
        hidden={!assignees?.nodes?.length}
        fieldTitle={'Assignee'}
        right={{
          children: assignees?.nodes?.map((assignee) => (
            <Avatar
              key={'Assignee ' + assignee?.login}
              size="extra-small"
              textIsHidden={Boolean(assignees?.nodes && assignees?.nodes?.length > 1)}
              text={assignee?.login ?? assignee?.name ?? undefined}
              avatarUrl={assignee?.avatarUrl}
            />
          )),
        }}
      />

      {(issue.__typename === 'Issue' || issue.__typename === 'PullRequest') && (
        <Fragment>
          {issue?.projectItems?.nodes.length > 0 &&
          issue?.projectItems?.nodes?.[0]?.fieldValueByName?.field.name ? (
            <IssueField
              fieldTitle={issue?.projectItems?.nodes?.[0]?.fieldValueByName?.field.name}
              right={{
                children: issue?.projectItems?.nodes?.map(
                  (projectItem, index) =>
                    projectItem?.fieldValueByName?.__typename ===
                      'ProjectV2ItemFieldSingleSelectValue' && (
                      <Button
                        onClick={() => {
                          if (
                            projectItem?.fieldValueByName?.__typename ===
                            'ProjectV2ItemFieldSingleSelectValue'
                          )
                            projectItem?.fieldValueByName?.description &&
                              openModal({
                                title: projectItem.fieldValueByName.name,
                                children: projectItem.fieldValueByName.description,
                              });
                        }}
                        fill={presetColors[projectItem?.fieldValueByName?.color]}
                        key={projectItem?.fieldValueByName.name ?? index}
                        text={projectItem?.fieldValueByName?.name}
                        appearance="none"
                        size="extra-small"
                      />
                    )
                ),
              }}
            />
          ) : undefined}

          {issue?.labels?.nodes?.length > 0 ? (
            <IssueField
              name="Labels"
              fieldTitle={'Labels'}
              right={{
                children: issue.labels?.nodes.map((label) => {
                  return (
                    <Button
                      onClick={() => {
                        label.description &&
                          openModal({
                            title: label.name,
                            children: label.description,
                          });
                      }}
                      key={label.name}
                      text={label.name}
                      fill={label.color}
                      appearance="none"
                      size="extra-small"
                    />
                  );
                }),
              }}
            />
          ) : undefined}
        </Fragment>
      )}
      {children}

      <IssueField
        fieldTitle={'Updated At'}
        right={{
          children: (
            <CustomText size="extra-small">{formatDate({ value: issue.updatedAt })}</CustomText>
          ),
        }}
      />
    </IssueContentBody>
  );
};
