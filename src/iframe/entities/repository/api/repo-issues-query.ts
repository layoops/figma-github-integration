import type { DraftIssue, Issue, PageInfo, Repository } from '@octokit/graphql-schema';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_REPO_ISSUES_QUERY } from '@/shared/api/graphql/queries/repo';
import { useAppContext } from '@/shared/lib/contexts';

type GetRepoIssuesParams = {
  repoId?: string;
  issueStates?: ('OPEN' | 'CLOSED')[];
  perPage?: number;
  startCursor?: string;
  pageIndex?: number;
};

export type GetRepoIssuesResponse = {
  node: Pick<Repository, 'name' | 'issues'> | null;
};

export type CurrentPageIssuesData = {
  issues: (Issue | DraftIssue | null | undefined)[];
  totalCount: number;
  pageInfo: Partial<PageInfo>;
};

export const getRepoIssuesQueryKey = ({
  repoId,
  issueStates,
  perPage,
  pageIndex,
}: GetRepoIssuesParams) =>
  ['github-repo-issues', repoId, JSON.stringify(issueStates), perPage, pageIndex] as const;

export const useGitHubRepoIssues = ({
  repoId,
  issueStates = ['OPEN'],
  perPage = 10,
  startCursor,
  pageIndex,
}: GetRepoIssuesParams) => {
  const { githubAccessToken } = useAppContext();

  return useQuery<GetRepoIssuesResponse, Error, CurrentPageIssuesData>({
    queryKey: getRepoIssuesQueryKey({ repoId, issueStates, perPage, pageIndex }),
    queryFn: async (): Promise<GetRepoIssuesResponse> => {
      return githubRequest<GetRepoIssuesResponse>({
        query: GQL_REPO_ISSUES_QUERY,
        variables: {
          id: repoId,
          first: perPage,
          after: startCursor,
          states: issueStates,
        },
        token: githubAccessToken,
      });
    },
    placeholderData: keepPreviousData,
    enabled: Boolean(repoId && githubAccessToken),
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    select: (response): CurrentPageIssuesData => {
      const issuesData = response.node?.issues;

      if (!issuesData) {
        return {
          issues: [],
          totalCount: 0,
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
        };
      }

      return {
        issues: issuesData.nodes ?? [],
        totalCount: issuesData.totalCount,
        pageInfo: issuesData.pageInfo,
      };
    },
  });
};
