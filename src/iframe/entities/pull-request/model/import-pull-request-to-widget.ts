import type { PullRequest } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_PULL_REQUEST_QUERY } from '@/shared/api/graphql/queries/pull-request';
import { sendMessageToWidget } from '@/shared/lib/utils';

type ImportPullRequestToWidgetProps = {
  id: string;
  token: string;
  commentsFirst?: number;
};

type PullRequestQueryResponse = {
  node: PullRequest | null;
};

export const importPullRequestToWidget = async ({
  id,
  token,
  commentsFirst,
}: ImportPullRequestToWidgetProps) => {
  const response = await githubRequest<PullRequestQueryResponse>({
    query: GQL_PULL_REQUEST_QUERY,
    variables: {
      id,
      includeMilestone: true,
      includeComments: true,
      includeLabels: true,
      includeDevelopment: true,
      ...(commentsFirst !== undefined && { commentsFirst }),
    },
    token,
  });

  const data = response.node;
  if (data) {
    sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST, data });
  }
  return data;
};
