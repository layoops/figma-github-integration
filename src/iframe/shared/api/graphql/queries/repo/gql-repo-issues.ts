import { GQL_ISSUE_DEFAULT_VARIABLES, GQL_ISSUE_FRAGMENT } from '../issue';

export const GQL_REPO_ISSUES_QUERY = `
${GQL_ISSUE_FRAGMENT}
query RepoIssues($id: ID!, $first: Int = 100, $after: String, $states: [IssueState!]!, ${GQL_ISSUE_DEFAULT_VARIABLES}) {
  node(id: $id) {
    ... on Repository {
      name
      issues(first: $first, after: $after, orderBy: { field: CREATED_AT, direction: DESC }, states: $states) {
        totalCount
        nodes {
          ...IssueFragment
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
