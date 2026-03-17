import type { DraftIssue } from '@octokit/graphql-schema';

import { githubGraphqlApi } from '@/shared/api/graphql/github-graphql-api';

import { CREATE_DRAFT_ISSUE_QUERY } from '../api/create-issue-query';

type GetIssueProps = {
  variables: {
    id: string;
    title: string;
    body: string;
  };
  token: string;
};

export async function createDraftIssue({ variables: { id, title, body }, token }: GetIssueProps) {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: CREATE_DRAFT_ISSUE_QUERY,
      variables: {
        id: id,
        title: title,
        body: body,
      },
    }),
  });

  const json = await response.json();
  return json?.data.addProjectV2DraftIssue.projectItem.content as DraftIssue;
}

export const linkCreatedDraftIssue = async ({
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
  const data = await createDraftIssue({
    variables: { id: id, ...passedData },
    token,
  });
  window.parent.postMessage({ pluginMessage: { type, data } }, '*');
  return data;
};
