import type { Issue } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_ISSUE_QUERY } from '@/shared/api/graphql/queries/issue';
import { sendMessageToWidget } from '@/shared/lib/utils';

type IssueQueryResponse = {
  node: Issue | null;
};

type ImportIssueToWidgetProps = {
  issue?: Issue | null;
};

export const importIssueToWidget = async ({ issue }: ImportIssueToWidgetProps) => {
  if (!issue) {
    return;
  }

  sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUE, data: issue });

  return issue;
};

type ImportIssueByIdToWidgetProps = {
  id: string;
  token: string;
  commentsFirst?: number;
};

export const importIssueByIdToWidget = async ({
  id,
  token,
  commentsFirst,
}: ImportIssueByIdToWidgetProps) => {
  const response = await githubRequest<IssueQueryResponse>({
    query: GQL_ISSUE_QUERY,
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
    sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUE, data });
  }
  return data;
};
