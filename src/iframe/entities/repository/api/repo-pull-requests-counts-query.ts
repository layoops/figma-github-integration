import { useQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_REPO_PULL_REQUESTS_COUNTS_QUERY } from '@/shared/api/graphql/queries/repo';
import { useAppContext } from '@/shared/lib/contexts';

type Params = {
  repoId?: string;
};

type CountsData = {
  openPullRequestsCount: { totalCount: number };
  closedPullRequestsCount: { totalCount: number };
  pullRequestsCount: { totalCount: number };
};

export const getRepoPullRequestsCountsQueryKey = ({ repoId }: Params) =>
  ['github-repo-pull-requests-counts', repoId] as const;

export const useGitHubRepoPullRequestsCounts = ({ repoId }: Params) => {
  const { githubAccessToken } = useAppContext();

  return useQuery<{ node: CountsData | null }, Error, CountsData | null>({
    queryKey: getRepoPullRequestsCountsQueryKey({ repoId }),
    queryFn: () =>
      githubRequest({
        query: GQL_REPO_PULL_REQUESTS_COUNTS_QUERY,
        variables: { id: repoId },
        token: githubAccessToken,
      }),
    enabled: Boolean(repoId && githubAccessToken),
    select: (data) => data?.node ?? null,
  });
};
