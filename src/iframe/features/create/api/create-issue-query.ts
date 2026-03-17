import {
  GQL_DRAFT_ISSUE_FRAGMENT,
  GQL_ISSUE_DEFAULT_VARIABLES,
  GQL_ISSUE_FRAGMENT,
} from '@/shared/api/graphql/queries/issue';

export const CREATE_ISSUE_QUERY = `
${GQL_ISSUE_FRAGMENT}
mutation CreateIssue ($id: ID!, $title: String!, $body: String!, ${GQL_ISSUE_DEFAULT_VARIABLES}) {
  createIssue(input: {repositoryId: $id, title: $title, body: $body}) {
    issue {
      ...IssueFragment
    }
  }
}`;

export const CREATE_DRAFT_ISSUE_QUERY = `
${GQL_DRAFT_ISSUE_FRAGMENT}
mutation CreateDraftIssue($id: ID!, $title: String!, $body: String!, $projectFieldValue: String = "Status") {
    addProjectV2DraftIssue(input: { projectId: $id, title: $title, body: $body }) {
        projectItem {
            content {
                ...DraftIssueFragment
            }
        }
    }
}
`;
