import type { PageInfo, PullRequest, Repository } from '@octokit/graphql-schema';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_REPO_PULL_REQUESTS_QUERY } from '@/shared/api/graphql/queries/repo';
import { useAppContext } from '@/shared/lib/contexts';

type Params = {
  repoId?: string;
  states?: ('OPEN' | 'CLOSED' | 'MERGED')[];
  perPage?: number;
  startCursor?: string;
  pageIndex?: number;
};

export type CurrentPagePullRequestsData = {
  pullRequests: (PullRequest | null | undefined)[];
  totalCount: number;
  pageInfo: Partial<PageInfo>;
};

type Response = {
  node: Pick<Repository, 'pullRequests'> | null;
};

export const getRepoPullRequestsQueryKey = ({ repoId, states, perPage, pageIndex }: Params) =>
  ['github-repo-pull-requests', repoId, JSON.stringify(states), perPage, pageIndex] as const;

export const useGitHubRepoPullRequests = ({
  repoId,
  states = ['OPEN'],
  perPage = 10,
  startCursor,
  pageIndex,
}: Params) => {
  const { githubAccessToken } = useAppContext();

  return useQuery<Response, Error, CurrentPagePullRequestsData>({
    queryKey: getRepoPullRequestsQueryKey({ repoId, states, perPage, pageIndex }),
    queryFn: () =>
      githubRequest({
        query: GQL_REPO_PULL_REQUESTS_QUERY,
        variables: {
          id: repoId,
          first: perPage,
          after: startCursor,
          states,
        },
        token: githubAccessToken,
      }),
    placeholderData: keepPreviousData,
    enabled: Boolean(repoId && githubAccessToken),
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (response) => {
      const prData = response.node?.pullRequests;

      if (!prData) {
        return {
          pullRequests: [],
          totalCount: 0,
          pageInfo: { endCursor: null, hasNextPage: false },
        };
      }

      return {
        pullRequests: prData.nodes ?? [],
        totalCount: prData.totalCount,
        pageInfo: prData.pageInfo,
      };
    },
  });
};
