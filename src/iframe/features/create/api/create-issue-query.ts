import { CREATE_DRAFT_ISSUE_FRAGMENT, CREATE_ISSUE_FRAGMENT } from './create-issue-fragments';

export const CREATE_ISSUE_QUERY = `
${CREATE_ISSUE_FRAGMENT}
mutation CreateIssue ($id: ID!, $title: String!, $body: String!) {
  createIssue(input: {repositoryId: $id, title: $title, body: $body}) {
    issue {
    ...CreateIssueFragment
    }
  }
}`;

export const CREATE_DRAFT_ISSUE_QUERY = `
${CREATE_DRAFT_ISSUE_FRAGMENT}
mutation CreateDraftIssue($id: ID!, $title: String!, $body: String!) {
    addProjectV2DraftIssue(input: { projectId: $id, title: $title, body: $body }) {
        projectItem {
            content {
                ...CreateDraftIssueFragment
            }
        }
    }
}
`;
