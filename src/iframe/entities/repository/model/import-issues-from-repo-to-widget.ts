import type { ApplicationSettings } from '@/global-shared/application-settings';
import type { Issue } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_REPO_ISSUES_QUERY } from '@/shared/api/graphql/queries/repo';
import { sendMessageToWidget } from '@/shared/lib/utils';

type GetRepoIssuesProps = {
  owner: string;
  name: string;
  settings?: ApplicationSettings;
  token: string;
  quantity?: number;
  cursor?: string | null;
};

export async function getRepositoryIssues({
  owner,
  name,
  settings,
  token,
  quantity = 100,
  cursor = null,
}: GetRepoIssuesProps) {
  const variables = {
    owner,
    name,
    quantity,
    cursor,
    projectFieldValue: settings?.project.customField,
    includeMilestone: settings?.issue.includeMilestone,
    includeComments: settings?.issue.includeComments,
    includeLabels: settings?.issue.includeLabels,
    includeDevelopment: settings?.issue.includeDevelopment,
  };

  const response = await githubRequest({ query: GQL_REPO_ISSUES_QUERY, variables, token });

  const json = await response.json();
  return json?.data?.repository?.issues;
}

export const importIssuesFromRepoToWidget = async ({
  owner,
  name,
  settings,
  token,
}: {
  owner: string;
  name: string;
  settings?: ApplicationSettings;
  token: string;
}) => {
  const perPage = 100;
  let cursor: string | null = null;
  const all: Issue[] = [];

  while (true) {
    const page = await getRepositoryIssues({
      owner,
      name,
      settings,
      token,
      quantity: perPage,
      cursor,
    });

    const nodes = page?.nodes ?? [];
    all.push(...(nodes as Issue[]));

    const pageInfo = page?.pageInfo;
    if (!pageInfo?.hasNextPage) {
      break;
    }
    cursor = pageInfo.endCursor;
  }

  sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUES, data: all });
  return all;
};
