import type { ProjectV2 } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_PROJECT_QUERY } from '@/shared/api/graphql/queries/project';
import { sendMessageToWidget } from '@/shared/lib/utils';

type ProjectQueryResponse = {
  node: ProjectV2 | null;
};

type ImportProjectByIdToWidgetProps = {
  id: string;
  token: string;
};

export const importProjectByIdToWidget = async ({ id, token }: ImportProjectByIdToWidgetProps) => {
  const response = await githubRequest<ProjectQueryResponse>({
    query: GQL_PROJECT_QUERY,
    variables: {
      id,
      includeIssues: true,
      includeDraftIssues: true,
      includePullRequests: true,
      quantity: 100,
      includeLabels: true,
      includeMilestone: true,
      includeComments: true,
      includeDevelopment: true,
    },
    token,
  });

  const data = response.node;
  if (data) {
    sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_PROJECT, data: { project: data } });
  }
  return data;
};
