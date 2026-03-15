import { GQL_PULL_REQUEST_FRAGMENT, GQL_PULL_REQUEST_VARIABLES } from '../pull-request';

export const GQL_REPO_PULL_REQUESTS_QUERY = `
${GQL_PULL_REQUEST_FRAGMENT}
query RepoPullRequests(
  $id: ID!
  $first: Int = 10
  $after: String
  $states: [PullRequestState!]
  ${GQL_PULL_REQUEST_VARIABLES}
) {
  node(id: $id) {
    ... on Repository {
      name
      pullRequests(
        first: $first
        after: $after
        states: $states
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          ...PullRequestFragment
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
}
`;
