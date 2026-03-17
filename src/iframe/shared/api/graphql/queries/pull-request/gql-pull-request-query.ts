import { GQL_PULL_REQUEST_FRAGMENT, GQL_PULL_REQUEST_VARIABLES } from './gql-pull-request-fragment';

export const GQL_PULL_REQUEST_QUERY = `
${GQL_PULL_REQUEST_FRAGMENT}
query PullRequest($id: ID!, ${GQL_PULL_REQUEST_VARIABLES}) {
  node(id: $id) {
    id
    ...PullRequestFragment
  }
}`;
