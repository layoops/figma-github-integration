import type { Issue } from '@octokit/graphql-schema';

import { githubGraphqlApi } from '@/shared/api/graphql/github-graphql-api';

import { CREATE_ISSUE_QUERY } from '../api/create-issue-query';

type GetIssueProps = {
  variables: {
    id: string;
    title: string;
    body: string;
  };
  token: string;
};

export async function createIssue({ variables: { id, title, body }, token }: GetIssueProps) {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: CREATE_ISSUE_QUERY,
      variables: {
        id: id,
        title: title,
        body: body,
      },
    }),
  });

  const json = await response.json();
  return json?.data.createIssue.issue as Issue;
}

export const linkCreatedIssue = async ({
  variables: { id, type = 'import-github-issue', passedData },
  token,
}: {
  token: string;
  variables: {
    id: string;
    type?: string;
    passedData: { title: string; body: string };
  };
}) => {
  if (!id) return;
  const data = await createIssue({
    variables: { id: id, ...passedData },
    token,
  });
  window.parent.postMessage({ pluginMessage: { type, data } }, '*');
  return data;
};
