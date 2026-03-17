import type { PullRequest } from '@octokit/graphql-schema';

import { LinkExternalIcon } from '@primer/octicons-react';
import {
  ActionList,
  Avatar,
  AvatarStack,
  IssueLabelToken,
  LabelGroup,
  Link,
  Stack,
  Text,
} from '@primer/react';
import { createLink } from '@tanstack/react-router';

import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { useTranslation } from '@/shared/lib/contexts';
import {
  EntityCell,
  EntityPreview,
  EntityPreviewMetadataGroup,
  type EntityPreviewTitleProps,
  EntityStateLabel,
} from '@/shared/ui';

type PullRequestPreviewProps = {
  pullRequest: PullRequest;
};

export const ActionListLinkItem = createLink(ActionList.LinkItem);

export const PullRequestPreview = ({ pullRequest }: PullRequestPreviewProps) => {
  const { t } = useTranslation();

  const getPullRequestState = (): EntityPreviewTitleProps['variant'] => {
    if (pullRequest.isDraft) {
      return 'pull-request-draft';
    }

    switch (pullRequest.state) {
      case 'OPEN':
        return 'pull-request-opened';
      case 'CLOSED':
        return 'pull-request-closed';
      case 'MERGED':
        return 'pull-request-merged';

      default:
        return 'pull-request-opened';
    }
  };

  return (
    <EntityPreview
      entity={getPullRequestState()}
      title={pullRequest?.title}
      link={pullRequest?.url}
      author={pullRequest.author}
      authorAssociation={pullRequest.authorAssociation}
      createdAt={pullRequest.createdAt}
      bodyHTML={pullRequest.bodyHTML}
      comments={pullRequest?.comments?.nodes}
      commentsPageInfo={
        pullRequest?.comments?.pageInfo
          ? {
              hasNextPage: pullRequest.comments.pageInfo.hasNextPage,
              endCursor: pullRequest.comments.pageInfo.endCursor ?? '',
              totalCount: pullRequest.comments.totalCount,
            }
          : undefined
      }
      entityId={pullRequest.id}
      number={pullRequest.number}
      status={
        <LabelGroup>
          <EntityStateLabel target="pull-request" state={pullRequest.state} />
        </LabelGroup>
      }
      topMetadata={
        <>
          {Boolean(pullRequest?.assignees?.nodes && pullRequest.assignees?.nodes.length) && (
            <EntityPreviewMetadataGroup
              title={t('entity.pullRequest.entityPreview.metadataGroup.assignees.title')}
              orientation="horizontal"
            >
              <AvatarStack>
                {pullRequest?.assignees?.nodes?.map((assignee) => (
                  <Link target="_blank" key={assignee?.id} href={assignee?.url}>
                    <Avatar src={assignee?.avatarUrl} />
                  </Link>
                ))}
              </AvatarStack>
            </EntityPreviewMetadataGroup>
          )}
          {Boolean(pullRequest?.labels?.nodes && pullRequest?.labels?.nodes.length) && (
            <EntityPreviewMetadataGroup
              title={t('entity.pullRequest.entityPreview.metadataGroup.labels.title')}
              orientation="horizontal"
            >
              <LabelGroup>
                {pullRequest?.labels?.nodes?.map((label) => (
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
            title={t('entity.pullRequest.entityPreview.metadataGroup.assignees.title')}
            emptyText={t('entity.pullRequest.entityPreview.metadataGroup.assignees.emptyText')}
            orientation="vertical"
            state={
              pullRequest?.assignees?.nodes && pullRequest?.assignees?.nodes.length
                ? 'idle'
                : 'empty'
            }
          >
            {pullRequest?.assignees?.nodes && pullRequest?.assignees?.nodes.length && (
              <ActionList variant="full">
                {pullRequest?.assignees?.nodes.map((assignee) => (
                  <ActionList.LinkItem target="_blank" key={assignee?.login} href={assignee?.url}>
                    <ActionList.LeadingVisual>
                      <Avatar src={assignee?.avatarUrl} />
                    </ActionList.LeadingVisual>
                    <ActionList.TrailingVisual>
                      <LinkExternalIcon size={16} />
                    </ActionList.TrailingVisual>
                    {assignee?.login}
                  </ActionList.LinkItem>
                ))}
              </ActionList>
            )}
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.pullRequest.entityPreview.metadataGroup.labels.title')}
            emptyText={t('entity.pullRequest.entityPreview.metadataGroup.labels.emptyText')}
            orientation="vertical"
            state={
              pullRequest?.labels?.nodes && pullRequest?.labels?.nodes.length ? 'idle' : 'empty'
            }
          >
            {pullRequest?.labels?.nodes && pullRequest?.labels?.nodes.length && (
              <LabelGroup>
                {pullRequest?.labels?.nodes.map((label) => (
                  <IssueLabelToken text={label?.name} fillColor={`#${label?.color}`} />
                ))}
              </LabelGroup>
            )}
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.pullRequest.entityPreview.metadataGroup.projects.title')}
            emptyText={t('entity.pullRequest.entityPreview.metadataGroup.projects.emptyText')}
            orientation="vertical"
            state={
              pullRequest?.projectItems?.nodes && pullRequest?.projectItems?.nodes.length
                ? 'idle'
                : 'empty'
            }
          >
            {pullRequest?.projectItems?.nodes && pullRequest?.projectItems?.nodes.length && (
              <ActionList variant="full">
                {pullRequest?.projectItems?.nodes.map((projectItem) => (
                  <ActionListLinkItem
                    to={'/project/$id'}
                    params={{ id: projectItem?.project.id ?? '' }}
                  >
                    <EntityCell title={projectItem?.project.title} target="pull-request" />
                  </ActionListLinkItem>
                ))}
              </ActionList>
            )}
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.pullRequest.entityPreview.metadataGroup.milestone.title')}
            emptyText={t('entity.pullRequest.entityPreview.metadataGroup.milestone.emptyText')}
            orientation="vertical"
            state={pullRequest?.milestone ? 'idle' : 'empty'}
          >
            <Stack gap="condensed">
              <Text size="small" weight="semibold">
                <ActionList variant="full">
                  <ActionListLinkItem target="_blank" to={pullRequest?.milestone?.url}>
                    {pullRequest?.milestone?.title}
                    <ActionList.TrailingVisual>
                      <LinkExternalIcon size={16} />
                    </ActionList.TrailingVisual>
                  </ActionListLinkItem>
                </ActionList>
              </Text>
            </Stack>
          </EntityPreviewMetadataGroup>
          <EntityPreviewMetadataGroup
            title={t('entity.issue.entityPreview.metadataGroup.development.title')}
            emptyText={t('entity.issue.entityPreview.metadataGroup.development.emptyText')}
            orientation="vertical"
            state={
              pullRequest?.timelineItems?.nodes && pullRequest?.timelineItems?.nodes?.length > 0
                ? 'idle'
                : 'empty'
            }
          >
            {pullRequest?.timelineItems?.nodes &&
              pullRequest.timelineItems.nodes.map((timelineItem) => {
                if (timelineItem?.__typename === 'ConnectedEvent')
                  return (
                    <>
                      <ActionList variant="full">
                        <ActionListLinkItem
                          to={ROUTES_MAP[ROUTES.ISSUE]}
                          params={{ id: timelineItem.subject.id }}
                        >
                          <EntityCell
                            title={timelineItem.subject.title}
                            state={timelineItem.subject.state}
                            target="issue"
                            bottomContent={
                              <Text size="small">
                                {timelineItem.subject.repository?.nameWithOwner}
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
