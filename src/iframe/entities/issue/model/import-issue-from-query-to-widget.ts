import type { IssueEdge } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_ISSUE_SEARCH_QUERY } from '@/shared/api/graphql/queries/issue';
import { sendMessageToWidget } from '@/shared/lib/utils';

const DEFAULT_QUANTITY = 14;
const MIN_ARRAY_LENGTH = 0;
const IMPORT_DELAY_MS = 100;

export async function getIssueByQuery({
  variables: { query, projectFieldValue, quantity },
  token,
}: {
  variables: { query: string; projectFieldValue?: string; quantity?: number };
  token: string;
}) {
  if (!query || !query.trim()) {
    throw new Error('Search query is required and cannot be empty');
  }

  if (!token || !token.trim()) {
    throw new Error('GitHub access token is required');
  }

  const variables = {
    query: query.trim(),
    projectFieldValue: projectFieldValue,
    quantity: quantity || DEFAULT_QUANTITY,
  };

  const response = await githubRequest({
    query: GQL_ISSUE_SEARCH_QUERY,
    variables: variables,
    token,
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors && json.errors.length > MIN_ARRAY_LENGTH) {
    throw new Error(`GraphQL error: ${json.errors[0].message}`);
  }

  if (!json.data || !json.data.search) {
    throw new Error('Invalid response from GitHub API');
  }

  const edges = json.data.search.edges as IssueEdge[];

  return edges;
}

export const importIssueFromQueryToWidget = async ({
  variables: { query, quantity },
  token,
  t,
}: {
  variables: { query: string; quantity?: number };
  token: string;
  t: (key: string) => string;
}) => {
  try {
    const data = await getIssueByQuery({ variables: { query, quantity }, token });

    if (!data || data.length === MIN_ARRAY_LENGTH) {
      const errorMsg = t('errors.noIssuesFound') || 'No issues found for the given query';

      throw new Error(errorMsg);
    }

    for (let i = 0; i < data.length; i++) {
      const edge = data[i];
      if (!edge || !edge.node) {
        console.warn(`Skipping invalid edge at index ${i}:`, edge);
        continue;
      }

      sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_QUERY_ISSUE, data: edge.node });

      if (i < data.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, IMPORT_DELAY_MS));
      }
    }
  } catch (error) {
    console.error('Error in importIssueFromQuery:', error);
    throw error;
  }
};
