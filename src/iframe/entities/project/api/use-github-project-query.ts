import type { ProjectV2 } from '@octokit/graphql-schema';

import { useQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_PROJECT_QUERY } from '@/shared/api/graphql/queries/project';
import { useAppContext } from '@/shared/lib/contexts';

type GetProjectParams = {
  id?: string;
};

type GetProjectResponse = {
  node: ProjectV2 | null;
};

export const getProjectQueryKey = ({ id }: GetProjectParams) => ['github-issue', id] as const;

export const useGitHubProject = ({ id }: GetProjectParams) => {
  const { githubAccessToken } = useAppContext();

  const variables = {
    id: id,
    includeIssues: true,
    includeDraftIssues: true,
    includePullRequests: true,
    quantity: 100,
    includeLabels: true,
    includeMilestone: true,
    includeComments: true,
    includeDevelopment: true,
  };

  return useQuery<GetProjectResponse, Error, ProjectV2 | undefined>({
    queryKey: getProjectQueryKey({ id }),
    queryFn: () =>
      githubRequest<GetProjectResponse>({
        query: GQL_PROJECT_QUERY,
        variables,
        token: githubAccessToken,
      }),
    enabled: Boolean(id && githubAccessToken),
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    select: (data) => data.node ?? undefined,
  });
};
