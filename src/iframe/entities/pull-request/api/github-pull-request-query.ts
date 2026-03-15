import type { ApplicationSettings } from '@/shared/lib/types';
import type { PullRequest } from '@octokit/graphql-schema';

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { issueQueryPreviewOptions } from '@/entities/issue';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_PULL_REQUEST_QUERY } from '@/shared/api/graphql/queries/pull-request';

type PullRequestQueryProps = {
  id?: string;
  token?: string;
  settings?: ApplicationSettings;
};

type PullRequestQueryResponse = {
  node: PullRequest | null;
};

export const getPullRequestQueryKey = (id: PullRequestQueryProps['id']) =>
  ['github-pull-request', id] as const;

export const pullRequestQueryOptions = ({ id, token, settings }: PullRequestQueryProps) => {
  const variables = {
    id,
    projectFieldValue: settings?.project.customField,
    includeMilestone: settings?.issue.includeMilestone ?? false,
    includeComments: settings?.issue.includeComments ?? false,
    includeLabels: settings?.issue.includeLabels ?? false,
    includeDevelopment: settings?.issue.includeDevelopment ?? false,
  };

  return queryOptions({
    queryKey: getPullRequestQueryKey(id),
    queryFn: () =>
      githubRequest<PullRequestQueryResponse>({
        query: GQL_PULL_REQUEST_QUERY,
        variables,
        token: token || '',
      }),
    enabled: Boolean(id && token),
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (data) => data.node ?? undefined,
  });
};

export const useGitHubPullRequest = (props: PullRequestQueryProps) => {
  return useSuspenseQuery(issueQueryPreviewOptions(props));
};
