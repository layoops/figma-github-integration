export const GQL_PULL_REQUEST_VARIABLES =
  '$projectFieldValue: String = "Status", $includeLabels: Boolean = true, $includeMilestone: Boolean = false, $includeComments: Boolean = false, $includeDevelopment: Boolean = false, $commentsFirst: Int = 4';

export const GQL_PULL_REQUEST_FRAGMENT = `fragment PullRequestFragment on PullRequest {
  __typename
  id
  title
  number
  state
  isDraft
  bodyText
  bodyHTML
  url
  createdAt
  updatedAt
  author {
    login
    avatarUrl
  }
  authorAssociation
  repository {
    name
    owner {
      ... on User {
        login
      }
      ... on Organization {
        login
      }
    }
  }
  assignees(first: 3)  {
    nodes {
      name
      url
      avatarUrl
      login
    }
  }
  labels(first: 4) @include(if: $includeLabels) {
    nodes {
      color
      name
      description
      url
    }
  }
  projectItems(first: 2) {
    nodes {
      project {
        __typename
        title
        id
        url
      }
      fieldValueByName(name: $projectFieldValue) {
        __typename
        ... on ProjectV2ItemFieldSingleSelectValue {
          __typename
          description
          name
          color
          id
          field {
            ... on ProjectV2SingleSelectField {
              name
            }
          }
        }
      }
    }
  }
  timelineItems(first: 36, itemTypes: CONNECTED_EVENT) @include(if: $includeDevelopment) {
    filteredCount
    nodes {
      ... on ConnectedEvent {
        __typename
        subject {
          ... on Issue {
            __typename
            id
            url
            state
            title
            repository {
              nameWithOwner
            }
          }
        }
      }
    }
  }
  milestone @include(if: $includeMilestone) {
    dueOn
    title
    id
    url
  }
  comments(first: $commentsFirst) @include(if: $includeComments) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      createdAt
      updatedAt
      bodyText
      bodyHTML
      url
      authorAssociation
      author {
        login
        url
        avatarUrl
      }
    }
  }
}`;
