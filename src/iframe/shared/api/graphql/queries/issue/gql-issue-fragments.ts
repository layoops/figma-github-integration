export const GQL_ISSUE_DEFAULT_VARIABLES =
  '$projectFieldValue: String = "Status", $includeLabels: Boolean = true, $includeMilestone: Boolean = false, $includeComments: Boolean = false, $includeDevelopment: Boolean = false, $commentsFirst: Int = 4';

export const GQL_ISSUE_FRAGMENT = `fragment IssueFragment on Issue {
  __typename
  id
  title
  number
  bodyText
  bodyHTML
  url
  state
  updatedAt
  createdAt
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
  assignees(first: 3) {
    nodes {
      name
      url
      avatarUrl
      login
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
          description
          __typename
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
  timelineItems(first: 8, itemTypes: CONNECTED_EVENT) @include(if: $includeDevelopment) {
    filteredCount
    nodes {
      ... on ConnectedEvent {
        __typename
        subject {
          ... on PullRequest {
            __typename
            id
            title
            state
            url
            repository {
              nameWithOwner
            }
          }
        }
      }
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
  parent {
    id
    title
    number
    state
    repository {
      nameWithOwner
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

export const GQL_DRAFT_ISSUE_FRAGMENT = `fragment DraftIssueFragment on DraftIssue {
   __typename
  id
  title
  bodyHTML
  bodyText
  updatedAt
  createdAt
  creator {
    avatarUrl
    login
  }
  assignees(first: 3) {
    nodes {
      name
      url
      avatarUrl
      login
    }
  }
  projectV2Items(first: 2) {
    nodes {
      id
      databaseId
      project {
        __typename
        title
        id
        url
      }
      fieldValueByName(name: $projectFieldValue) {
        __typename
        ... on ProjectV2ItemFieldSingleSelectValue {
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
}`;
