import type { Repository } from '@octokit/graphql-schema';

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_REPO_QUERY } from '@/shared/api/graphql/queries/repo';

type GetRepoParams = {
  repoId?: string;
  token?: string;
};

type GetRepoResponse = {
  node: Pick<Repository, 'nameWithOwner' | 'url'> | null;
};

export const getGitHubRepositoryQueryKey = (repoId?: string) => ['github-repo', repoId] as const;

export const githubRepositoryQueryOptions = ({ repoId, token }: GetRepoParams) => {
  return queryOptions({
    queryKey: getGitHubRepositoryQueryKey(repoId),
    queryFn: () =>
      githubRequest<GetRepoResponse>({
        query: GQL_REPO_QUERY,
        variables: { id: repoId },
        token: token || '',
      }),
    enabled: Boolean(repoId && token),
    staleTime: 5 * 60 * 1000,
    select: (data) => data.node ?? undefined,
  });
};

export const useGitHubRepository = (props: GetRepoParams) => {
  return useSuspenseQuery(githubRepositoryQueryOptions(props));
};
