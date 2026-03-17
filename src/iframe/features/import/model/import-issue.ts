import type { ApplicationSettings } from '@/entities/settings';
import type { Issue } from '@octokit/graphql-schema';

import { githubGraphqlApi } from '@/shared/api/graphql/github-graphql-api';
import { ISSUE_QUERY } from '@/shared/api/graphql/queries/issue';

type GetIssueProps = {
  id: string;
  settings?: ApplicationSettings;
  token: string;
};

export async function getIssue({ id, settings, token }: GetIssueProps) {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: ISSUE_QUERY,
      variables: {
        id: id,
        projectFieldValue: settings?.customField,
        includeMilestone: settings?.includeMilestone,
        includeComments: settings?.includeComments,
        includeLabels: settings?.includeLabels,
        includeLinking: settings?.includeLinking,
      },
    }),
  });

  const json = await response.json();
  return json?.data.node as Issue;
}

export const importIssue = async ({
  id,
  token,
  settings,
  type = 'import-github-issue',
}: GetIssueProps & { type?: 'import-github-issue' | 'import-github-pull-request' }) => {
  if (!id) return;
  const data = await getIssue({ id: id, token, settings });
  window.parent.postMessage({ pluginMessage: { type, data } }, '*');
  return data;
};
