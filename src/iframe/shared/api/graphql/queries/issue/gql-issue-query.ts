import { GQL_PULL_REQUEST_FRAGMENT } from '../pull-request';
import {
  GQL_DRAFT_ISSUE_FRAGMENT,
  GQL_ISSUE_DEFAULT_VARIABLES,
  GQL_ISSUE_FRAGMENT,
} from './gql-issue-fragments';

export const GQL_ISSUE_QUERY = `
${GQL_ISSUE_FRAGMENT}
${GQL_DRAFT_ISSUE_FRAGMENT}
${GQL_PULL_REQUEST_FRAGMENT}
query Issue($id: ID!, ${GQL_ISSUE_DEFAULT_VARIABLES}) {
  node(id: $id) {
    id
    ...IssueFragment
    ...DraftIssueFragment
    ...PullRequestFragment
  }
}`;

export const GQL_ISSUE_SEARCH_QUERY = `
${GQL_ISSUE_FRAGMENT}
${GQL_PULL_REQUEST_FRAGMENT}
query SearchQuery($query: String!, ${GQL_ISSUE_DEFAULT_VARIABLES}, $first: Int = 20, $after: String) {
  search(query: $query, type: ISSUE, first: $first, after: $after) {
    issueCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        ...IssueFragment
        ...PullRequestFragment
      }
    }
  }
}
`;
