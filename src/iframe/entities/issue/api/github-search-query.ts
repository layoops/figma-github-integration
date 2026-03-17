import type { PageInfo, Query as GithubQuery, SearchResultItem } from '@octokit/graphql-schema';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_ISSUE_SEARCH_QUERY } from '@/shared/api/graphql/queries/issue';
import { useAppContext } from '@/shared/lib/contexts';

type UseGithubSearchQueryParams = {
  query: string;
  first?: number;
  after?: string;
};

type SearchResponseData = {
  items: (SearchResultItem | undefined | null)[];
  totalCount: number;
  pageInfo: PageInfo;
};

export const useGithubSearchQuery = ({ query, first = 10, after }: UseGithubSearchQueryParams) => {
  const { githubAccessToken } = useAppContext();

  return useQuery<GithubQuery, Error, SearchResponseData>({
    queryKey: ['github-search', query, first, after],
    queryFn: () =>
      githubRequest<GithubQuery>({
        query: GQL_ISSUE_SEARCH_QUERY,
        variables: {
          query,
          first,
          after,
        },
        token: githubAccessToken,
      }),
    enabled: !!query && !!githubAccessToken,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    select: (data) => ({
      items: data?.search?.edges?.map((edge) => edge?.node) ?? [],
      totalCount: data?.search?.issueCount ?? 0,
      pageInfo: data?.search?.pageInfo ?? {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }),
  });
};
