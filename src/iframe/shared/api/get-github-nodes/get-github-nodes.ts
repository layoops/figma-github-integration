import { githubRequest } from '../graphql/github-graphql-api';
import {
  GQL_DRAFT_ISSUE_FRAGMENT,
  GQL_ISSUE_DEFAULT_VARIABLES,
  GQL_ISSUE_FRAGMENT,
} from '../graphql/queries/issue';
import { GQL_PULL_REQUEST_FRAGMENT } from '../graphql/queries/pull-request';

export const GQL_NODES_QUERY = `
${GQL_ISSUE_FRAGMENT}
${GQL_DRAFT_ISSUE_FRAGMENT}
${GQL_PULL_REQUEST_FRAGMENT}
query GetNodesByIds($ids: [ID!]!, ${GQL_ISSUE_DEFAULT_VARIABLES}) {
  nodes(ids: $ids) {
    __typename
    ...IssueFragment
    ...DraftIssueFragment
    ...PullRequestFragment
  }
}
`;

type GetGithubNodesByIdsParams = { ids: string[]; token?: string };

export const getGithubNodesByIds = async ({ ids, token }: GetGithubNodesByIdsParams) => {
  if (!ids.length) {
    return [];
  }

  const data = await githubRequest({
    query: GQL_NODES_QUERY,
    variables: { ids },
    token,
  });

  return data?.nodes ?? [];
};
