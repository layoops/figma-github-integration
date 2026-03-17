import type { IssueEdge } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/external/message-type';
import { githubGraphqlApi } from '@/shared/api/graphql/github-graphql-api';
import { ISSUE_SEARCH_QUERY } from '@/shared/api/graphql/queries/issue';

export async function getIssueByQuery({
  variables: { query, projectFieldValue, quantity },
  token,
}: {
  variables: { query: string; projectFieldValue?: string; quantity?: number };
  token: string;
}) {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: ISSUE_SEARCH_QUERY,
      variables: {
        query: query,
        projectFieldValue: projectFieldValue,
        quantity: quantity,
      },
    }),
  });

  const json = await response.json();
  return json?.data.search.edges as IssueEdge[];
}

export const importIssueFromQuery = async ({
  variables: { query, quantity },
  token,
}: {
  variables: { query: string; quantity?: number };
  token: string;
}) => {
  const data = await getIssueByQuery({ variables: { query, quantity }, token });

  if (!data.length) {
    throw new Error('No issues or pull requests were found');
  }

  for (const node of data) {
    window.parent.postMessage(
      { pluginMessage: { type: MESSAGE_TYPES.IMPORT_GITHUB_QUERY_ISSUE, data: node.node } },
      '*'
    );
  }
};
