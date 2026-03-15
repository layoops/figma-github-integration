import { GQL_DRAFT_ISSUE_FRAGMENT, GQL_ISSUE_FRAGMENT } from '../issue';
import { GQL_PULL_REQUEST_FRAGMENT } from '../pull-request';

export const GQL_PROJECT_VARIABLES =
  '$includeIssues: Boolean = true, $includeDraftIssues: Boolean = true, $includePullRequests: Boolean = true, $includeRepositories: Boolean = true';

export const GQL_PROJECT_FRAGMENT = `
${GQL_ISSUE_FRAGMENT}
${GQL_DRAFT_ISSUE_FRAGMENT}
${GQL_PULL_REQUEST_FRAGMENT}
fragment ProjectFragment on ProjectV2 {
  id
  title
  readme
  url
  closed
  public
  shortDescription
  repositories(first: 3) @include(if: $includeRepositories) {
    nodes {
        name
        nameWithOwner
        url
        isPrivate
    }
  }
  fields(first: 20) {
    totalCount
    nodes {
      ... on ProjectV2SingleSelectField {
        __typename
        name
        id
        dataType
        options {
          name
          color
          id
        }
      }
    }
  }
  owner {
    __typename
    ... on Organization {
      name
      login
      url
      avatarUrl
    }
    ... on User {
      name
      login
      url
      avatarUrl
    }
  }
  items(first: $quantity, orderBy: {field: POSITION, direction: DESC}) {
    totalCount
    nodes {
      createdAt
      id
      isArchived
      type
      updatedAt
      content {
        ...IssueFragment @include(if: $includeIssues)
        ...DraftIssueFragment @include(if: $includeDraftIssues)
        ...PullRequestFragment @include(if: $includePullRequests)
      }
    }
  }
}
`;
