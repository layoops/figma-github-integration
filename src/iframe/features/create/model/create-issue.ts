import type { Issue } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { sendMessageToWidget } from '@/shared/lib/utils';

import { CREATE_ISSUE_QUERY } from '../api/create-issue-query';

type GetIssueProps = {
  variables: {
    id: string;
    title: string;
    body: string;
  };
  token: string;
};

type IssueQueryResponse = {
  createIssue: {
    issue: Issue | null;
  };
};

export async function createIssue({ variables: { id, title, body }, token }: GetIssueProps) {
  const response = await githubRequest<IssueQueryResponse>({
    query: CREATE_ISSUE_QUERY,
    variables: {
      id,
      includeMilestone: true,
      includeComments: true,
      includeLabels: true,
      includeDevelopment: true,
      title: title,
      body: body,
    },
    token,
  });

  const data = response?.createIssue.issue;

  return data;
}

export const linkCreatedIssue = async ({
  variables: { id, passedData },
  token,
}: {
  token: string;
  variables: {
    id: string;
    passedData: { title: string; body: string };
  };
}) => {
  if (!id) {
    return;
  }
  const data = await createIssue({
    variables: { id: id, ...passedData },
    token,
  });
  sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUE, data });
  return data;
};
