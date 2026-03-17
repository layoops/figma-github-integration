import { PULL_REQUEST_FRAGMENT } from '../pull-request';
import { DRAFT_ISSUE_FRAGMENT, ISSUE_FRAGMENT, ISSUE_VARIABLES } from './issue-fragments';

export const ISSUE_QUERY = `
${ISSUE_FRAGMENT}
${DRAFT_ISSUE_FRAGMENT}
${PULL_REQUEST_FRAGMENT}
query Issues($id: ID!, ${ISSUE_VARIABLES}) {
  node(id: $id) {
    id
    ...IssueFragment
    ...DraftIssueFragment
    ...PullRequestFragment
  }
}`;

export const ISSUE_SEARCH_QUERY = `
${ISSUE_FRAGMENT}
${PULL_REQUEST_FRAGMENT}
query SearchQuery($query: String!, ${ISSUE_VARIABLES}, $quantity: Int = 14) {
  search(query: $query, type: ISSUE, first: $quantity) {
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
