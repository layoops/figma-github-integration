import type { ProjectV2, Repository } from '@octokit/graphql-schema';

import { useQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_REPO_PROJECTS_QUERY } from '@/shared/api/graphql/queries/repo';
import { useAppContext } from '@/shared/lib/contexts';

type GetRepoProjectsParams = {
  repoId?: string;
};

type RawRepoProjectsResponse = {
  node:
    | (Pick<Repository, 'name'> & {
        projectsV2: {
          nodes: (ProjectV2 | null)[];
        };
      })
    | null;
  errors?: Array<{ type: string; path: string[]; message: string }>;
};

type CleanRepoProjectsResponse = {
  name: string;
  projectsV2: {
    nodes: ProjectV2[];
  };
};

export const getRepoProjectsQueryKey = ({ repoId }: GetRepoProjectsParams) =>
  ['github-repo-projects', repoId] as const;

export const useGitHubRepoProjects = ({ repoId }: GetRepoProjectsParams) => {
  const { githubAccessToken } = useAppContext();

  const variables = {
    id: repoId,
    first: 100,
  };

  return useQuery<RawRepoProjectsResponse, Error, CleanRepoProjectsResponse | undefined>({
    queryKey: getRepoProjectsQueryKey({ repoId }),
    queryFn: () =>
      githubRequest<RawRepoProjectsResponse>({
        query: GQL_REPO_PROJECTS_QUERY,
        variables,
        token: githubAccessToken,
      }),
    enabled: Boolean(repoId && githubAccessToken),
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    select: (rawData) => {
      if (!rawData.node) {
        return undefined;
      }

      const validNodes = rawData.node.projectsV2.nodes.filter(
        (node): node is NonNullable<typeof node> => node !== null
      );

      return {
        name: rawData.node.name,
        projectsV2: {
          nodes: validNodes,
        },
      };
    },
  });
};
