import type { DraftIssue } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubGraphqlApi } from '@/shared/api/graphql/github-graphql-api';
import { sendMessageToWidget } from '@/shared/lib/utils';

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
  const data = await createDraftIssue({
    variables: { id: id, ...passedData },
    token,
  });
  sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUE, data });
  return data;
};
