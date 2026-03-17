import type { ProjectV2 } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/external/message-type';
import { githubGraphqlApi } from '@/shared/api/graphql/github-graphql-api';
import { PROJECT_QUERY } from '@/shared/api/graphql/queries/project/project-query';

import { countProjectContentTypes } from '../lib/count-project-content';

type HandleProject = {
  variables: {
    id: string;
    includeIssues?: boolean;
    includeDraftIssues?: boolean;
    includePullRequests?: boolean;
    quantity?: number;
  };
  type?: string;
  token: string;
};

export async function getProject({
  variables: { id, includeIssues, includeDraftIssues, includePullRequests, quantity },
  token,
}: HandleProject) {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: PROJECT_QUERY,
      variables: {
        id: id,
        includeIssues: includeIssues,
        includeDraftIssues: includeDraftIssues,
        includePullRequests: includePullRequests,
        quantity: quantity,
      },
    }),
  });

  const json = await response.json();
  return json?.data.node as ProjectV2;
}

export const handleProject = async ({
  variables: {
    id,
    includeDraftIssues = false,
    includeIssues = false,
    includePullRequests = false,
    quantity,
  },
  token,
}: HandleProject) => {
  try {
    const projectData = await getProject({
      variables: {
        id,
        includeIssues: includeIssues,
        includeDraftIssues: includeDraftIssues,
        includePullRequests: includePullRequests,
        quantity: quantity,
      },
      token,
    });

    const contentCount = countProjectContentTypes(projectData);
    return { projectData, contentCount };
  } catch (error) {
    console.error(error as Error);
  }
};

export const importProject = async ({ variables, token }: HandleProject) => {
  const project = await handleProject({
    variables,
    token,
  });

  if (project?.projectData?.items?.nodes) {
    window.parent.postMessage(
      {
        pluginMessage: {
          type: MESSAGE_TYPES.IMPORT_GITHUB_PROJECT,
          data: {
            project: project?.projectData,
            contentCount: project?.contentCount,
          },
        },
      },
      '*'
    );
    for (const node of project.projectData.items.nodes) {
      window.parent.postMessage(
        { pluginMessage: { type: MESSAGE_TYPES.IMPORT_GITHUB_QUERY_ISSUE, data: node?.content } },
        '*'
      );
    }
  }

  return project;
};
