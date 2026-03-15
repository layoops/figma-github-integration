import type { DraftIssue, Issue } from '@octokit/graphql-schema';

import { LinkExternalIcon } from '@primer/octicons-react';
import {
  ActionList,
  Avatar,
  AvatarStack,
  Button,
  IssueLabelToken,
  LabelGroup,
  Link,
  Stack,
  Text,
} from '@primer/react';
import { createLink, Link as RouterLink } from '@tanstack/react-router';

import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { useTranslation } from '@/shared/lib/contexts';
import {
  EntityCell,
  EntityPreview,
  EntityPreviewMetadataGroup,
  EntityStateLabel,
} from '@/shared/ui';

type IssuePreviewProps = {
  issue: Issue;
};

type IssueParent = Pick<Issue, 'title' | 'repository' | 'id' | 'state' | 'number'>;

export const ActionListLinkItem = createLink(ActionList.LinkItem);

export const IssuePreview = ({ issue }: IssuePreviewProps) => {
  const { t } = useTranslation();

  // @ts-expect-error Нет типов для parent
  const issueParent: IssueParent | undefined = issue['parent'];

  const draftIssue =
    (issue.__typename as DraftIssue['__typename']) && (issue as unknown as DraftIssue);

  const issueProjects = issue?.projectItems?.nodes?.filter((projectNode) => Boolean(projectNode));

  const draftIssueProjects = draftIssue?.projectV2Items?.nodes;
  const draftIssueProjectItem = draftIssueProjects?.[0];

  const projects = issueProjects ?? draftIssueProjects;

  const issueUrl =
    draftIssue?.__typename === 'DraftIssue' && draftIssueProjectItem?.project?.url
      ? `${draftIssueProjectItem?.project?.url}?pane=issue&itemId=${draftIssueProjectItem.databaseId}`
      : issue?.url;

  return (
    <EntityPreview
      number={issue.number}
      entity={issue.state === 'OPEN' ? 'issue-opened' : 'issue-closed'}
      title={issue?.title}
      link={issueUrl}
      status={
        <LabelGroup>
          <EntityStateLabel target="issue" state={issue.state} />
        </LabelGroup>
      }
      author={issue.author ?? draftIssue?.creator}
      authorAssociation={issue.authorAssociation}
      createdAt={issue.createdAt}
      comments={issue?.comments?.nodes}
      commentsPageInfo={
        issue?.comments?.pageInfo
          ? {
              hasNextPage: issue.comments.pageInfo.hasNextPage,
              endCursor: issue.comments.pageInfo.endCursor ?? '',
              totalCount: issue.comments.totalCount,
            }
          : undefined
      }
      entityId={issue.id}
      bodyHTML={issue.bodyHTML}
      headerActions={
        <Button as={RouterLink} to={ROUTES_MAP[ROUTES.ISSUE_CREATE]} size="small" variant="primary">
          {t('links.newIssue.title')}
        </Button>
      }
      topMetadata={
        <>
          {Boolean(issue?.assignees?.nodes && issue.assignees?.nodes.length) && (
            <EntityPreviewMetadataGroup
              title={t('entity.issue.entityPreview.metadataGroup.assignees.title')}
              orientation="horizontal"
            >
              <AvatarStack>
                {issue?.assignees?.nodes?.map((assignee) => (
                  <Link target="_blank" key={assignee?.id} href={assignee?.url}>
                    <Avatar src={assignee?.avatarUrl} />
                  </Link>
                ))}
              </AvatarStack>
            </EntityPreviewMetadataGroup>
          )}
          {Boolean(issue?.labels?.nodes && issue?.labels?.nodes.length) && (
            <EntityPreviewMetadataGroup
              title={t('entity.issue.entityPreview.metadataGroup.labels.title')}
              orientation="horizontal"
            >
              <LabelGroup>
                {issue?.labels?.nodes?.map((label) => (
                  <IssueLabelToken text={label?.name} fillColor={`#${label?.color}`} />
                ))}
              </LabelGroup>
            </EntityPreviewMetadataGroup>
          )}
        </>
      }
      bottomMetadata={
        <>
          <EntityPreviewMetadataGroup
            title={t('entity.issue.entityPreview.metadataGroup.assignees.title')}
            emptyText={t('entity.issue.entityPreview.metadataGroup.assignees.emptyText')}
            orientation="vertical"
            state={issue?.assignees?.nodes && issue?.assignees?.nodes.length ? 'idle' : 'empty'}
          >
            {issue?.assignees?.nodes && issue?.assignees?.nodes.length && (
              <ActionList variant="full">
                {issue?.assignees?.nodes.map((assignee) => (
                  <ActionListLinkItem target="_blank" key={assignee?.login} to={assignee?.url}>
                    <ActionList.LeadingVisual>
                      <Avatar src={assignee?.avatarUrl} />
                    </ActionList.LeadingVisual>
                    <ActionList.TrailingVisual>
                      <LinkExternalIcon size={16} />
                    </ActionList.TrailingVisual>
                    {assignee?.login}
                  </ActionListLinkItem>
                ))}
              </ActionList>
            )}
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.issue.entityPreview.metadataGroup.labels.title')}
            emptyText={t('entity.issue.entityPreview.metadataGroup.labels.emptyText')}
            orientation="vertical"
            state={issue?.labels?.nodes && issue?.labels?.nodes.length ? 'idle' : 'empty'}
          >
            {issue?.labels?.nodes && issue?.labels?.nodes.length && (
              <LabelGroup>
                {issue?.labels?.nodes.map((label) => (
                  <IssueLabelToken text={label?.name} fillColor={`#${label?.color}`} />
                ))}
              </LabelGroup>
            )}
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.issue.entityPreview.metadataGroup.projects.title')}
            emptyText={t('entity.issue.entityPreview.metadataGroup.projects.emptyText')}
            orientation="vertical"
            state={projects && projects.length ? 'idle' : 'empty'}
          >
            {projects && projects.length && (
              <ActionList variant="full">
                {projects?.map((projectItem) => {
                  return (
                    <ActionListLinkItem
                      to={ROUTES_MAP[ROUTES.PROJECT]}
                      params={{ id: projectItem?.project.id ?? '' }}
                    >
                      <EntityCell title={projectItem?.project.title} target="issue" />
                    </ActionListLinkItem>
                  );
                })}
              </ActionList>
            )}
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.issue.entityPreview.metadataGroup.milestone.title')}
            emptyText={t('entity.issue.entityPreview.metadataGroup.milestone.emptyText')}
            orientation="vertical"
            state={issue?.milestone ? 'idle' : 'empty'}
          >
            <Stack gap="condensed">
              <Text size="small" weight="semibold">
                <ActionList variant="full">
                  <ActionListLinkItem target="_blank" to={issue?.milestone?.url}>
                    {issue?.milestone?.title}
                    <ActionList.TrailingVisual>
                      <LinkExternalIcon size={16} />
                    </ActionList.TrailingVisual>
                  </ActionListLinkItem>
                </ActionList>
              </Text>
            </Stack>
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.issue.entityPreview.metadataGroup.relationship.title')}
            emptyText={t('entity.issue.entityPreview.metadataGroup.relationship.emptyText')}
            orientation="vertical"
            state={issueParent?.title ? 'idle' : 'empty'}
          >
            {issueParent?.title && (
              <>
                <Text size="small" style={{ lineHeight: '16px' }} className="muted-text">
                  {t('entity.issue.entityPreview.metadataGroup.relationship.issueParent.title')}
                </Text>
                <ActionList variant="full">
                  <ActionListLinkItem to={ROUTES_MAP[ROUTES.ISSUE]} params={{ id: issueParent.id }}>
                    <EntityCell
                      title={issueParent.title}
                      state={issueParent.state}
                      target="issue"
                      bottomContent={
                        <Text size="small">
                          {issueParent.repository.nameWithOwner}#{issueParent.number}
                        </Text>
                      }
                    />
                  </ActionListLinkItem>
                </ActionList>
              </>
            )}
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.issue.entityPreview.metadataGroup.development.title')}
            emptyText={t('entity.issue.entityPreview.metadataGroup.development.emptyText')}
            orientation="vertical"
            state={
              issue?.timelineItems?.nodes && issue?.timelineItems?.nodes?.length > 0
                ? 'idle'
                : 'empty'
            }
          >
            {issue?.timelineItems?.nodes &&
              issue.timelineItems.nodes.map((timelineItem) => {
                if (timelineItem?.__typename === 'ConnectedEvent')
                  return (
                    <>
                      <ActionList variant="full">
                        <ActionListLinkItem
                          to={ROUTES_MAP[ROUTES.PULL_REQUEST]}
                          params={{ id: timelineItem.subject.id }}
                        >
                          <EntityCell
                            title={timelineItem.subject.title}
                            state={timelineItem.subject.state}
                            target="pull-request"
                            bottomContent={
                              <Text size="small">
                                {timelineItem.subject.repository.nameWithOwner}
                              </Text>
                            }
                          />
                        </ActionListLinkItem>
                      </ActionList>
                    </>
                  );
              })}
          </EntityPreviewMetadataGroup>
        </>
      }
    />
  );
};
