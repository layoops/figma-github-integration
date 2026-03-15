import type { GithubEntity } from '../../../shared/lib/types/github';
import type { PullRequest } from '@octokit/graphql-schema';

import { resyncEntity } from '../../../features/import';
import { Avatar, Badge, CustomText, IconButton } from '../../../shared/ui';
import { AutoLayout } from '../../../widget-components';

type PullRequestContentPreviewProps = {
  pullRequest: PullRequest;
  githubEntity: GithubEntity;
  openedMore: boolean;
} & AutoLayoutProps;

export const PullRequestContentPreview = ({
  pullRequest,
  githubEntity,
  openedMore,
  ...rest
}: PullRequestContentPreviewProps) => {
  const { __typename, title } = pullRequest;
  const { labels, assignees } = __typename === 'PullRequest' && pullRequest;

  const minimizedTitle = !openedMore && title?.length > 85 ? `${title.slice(0, 85)}...` : title;

  return (
    <AutoLayout
      direction="vertical"
      verticalAlignItems="center"
      spacing={12}
      width="fill-parent"
      {...rest}
    >
      <CustomText width="fill-parent" size="medium">
        {minimizedTitle}
      </CustomText>
      <AutoLayout
        hidden={openedMore}
        direction="horizontal"
        verticalAlignItems="center"
        spacing={6}
        width="fill-parent"
      >
        {labels && (
          <AutoLayout
            hidden={!labels?.nodes?.length}
            direction="horizontal"
            spacing={6}
            width="fill-parent"
          >
            {labels.nodes.map((label) => (
              <Badge
                key={`pull-request-label-${label.name}`}
                text={label.name}
                color={label.color}
              />
            ))}
          </AutoLayout>
        )}

        <AutoLayout
          direction="horizontal"
          horizontalAlignItems="end"
          spacing={8}
          width={!labels?.nodes?.length ? 'fill-parent' : 'hug-contents'}
          height="hug-contents"
          verticalAlignItems="center"
        >
          {assignees?.nodes?.map(
            (assignee, index) =>
              index < 3 && (
                <Avatar
                  key={`pull-request-header-assignee-${assignee.name}`}
                  avatarUrl={assignee.avatarUrl}
                  size="extra-small"
                />
              )
          )}
          <IconButton
            onClick={() =>
              resyncEntity({
                githubEntity: githubEntity,
              })
            }
            icon="reload"
            size="extra-small"
            appearance="ghost"
          />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
