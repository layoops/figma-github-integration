import { useQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_REPO_ISSUES_COUNTS_QUERY } from '@/shared/api/graphql/queries/repo';
import { useAppContext } from '@/shared/lib/contexts';

type GetRepoCountParams = {
  repoId?: string;
};

type CountsData = {
  openIssuesCount: { totalCount: number };
  closedIssuesCount: { totalCount: number };
  issuesCount: { totalCount: number };
};

export const getRepoIssuesCountsQueryKey = ({ repoId }: GetRepoCountParams) =>
  ['github-repo-counts', repoId] as const;

export const useGitHubRepoIssuesCounts = ({ repoId }: GetRepoCountParams) => {
  const { githubAccessToken } = useAppContext();

  return useQuery<{ node: CountsData | null }, Error, CountsData | null>({
    queryKey: ['github-repo-counts', repoId],
    queryFn: () =>
      githubRequest<{ node: CountsData | null }>({
        query: GQL_REPO_ISSUES_COUNTS_QUERY,
        variables: { id: repoId },
        token: githubAccessToken,
      }),
    enabled: Boolean(repoId && githubAccessToken),
    select: (data) => data?.node ?? null,
  });
};
