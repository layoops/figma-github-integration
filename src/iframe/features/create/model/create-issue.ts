import type { Issue } from '@octokit/graphql-schema';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';

import { CREATE_ISSUE_QUERY } from '../api/create-issue-query';

type GetIssueProps = {
  variables: {
    id: string;
    title: string;
    body: string;
    labelIds?: string[];
  };
  token: string;
};

type IssueQueryResponse = {
  createIssue: {
    issue: Issue | null;
  };
};

export async function createIssue({
  variables: { id, title, body, labelIds },
  token,
}: GetIssueProps) {
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
      labelIds: labelIds?.length ? labelIds : undefined,
    },
    token,
  });

  const data = response?.createIssue.issue;

  return data;
}
