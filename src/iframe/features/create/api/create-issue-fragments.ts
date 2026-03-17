export const CREATE_ISSUE_FRAGMENT = `fragment CreateIssueFragment on Issue {
    __typename
    id
    title
    number
    bodyText
    url
    state
    updatedAt
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
}`;

export const CREATE_DRAFT_ISSUE_FRAGMENT = `fragment CreateDraftIssueFragment on DraftIssue {
    __typename
    id
    title
    bodyText
    updatedAt
    assignees(first: 3) {
        nodes {
            name
            url
            avatarUrl
            login
        }
    }
}`;
