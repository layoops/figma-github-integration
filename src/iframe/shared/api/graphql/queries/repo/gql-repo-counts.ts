export const GQL_REPO_ISSUES_COUNTS_QUERY = `
query RepoCounts($id: ID!) {
  node(id: $id) {
    ... on Repository {
      openIssuesCount: issues(states: [OPEN]) {
        totalCount
      }
      closedIssuesCount: issues(states: [CLOSED]) {
        totalCount
      }
      issuesCount: issues {
        totalCount
      }
    }
  }
}
`;

export const GQL_REPO_PULL_REQUESTS_COUNTS_QUERY = `
query RepoPullRequestCounts($id: ID!) {
  node(id: $id) {
    ... on Repository {
      openPullRequestsCount: pullRequests(states: [OPEN]) {
        totalCount
      }
      closedPullRequestsCount: pullRequests(states: [CLOSED, MERGED]) {
        totalCount
      }
      pullRequestsCount: pullRequests {
        totalCount
      }
    }
  }
}
`;
