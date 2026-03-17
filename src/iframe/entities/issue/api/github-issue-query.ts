import type { ApplicationSettings } from '@/shared/lib/types';
import type { Issue } from '@octokit/graphql-schema';

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_ISSUE_QUERY } from '@/shared/api/graphql/queries/issue';

type IssueQueryProps = {
  id?: string;
  token?: string;
  settings?: ApplicationSettings;
};

type IssueQueryResponse = {
  node: Issue | null;
};

export const getIssueQueryKey = (id?: string) => ['github-issue', id] as const;

export const issueQueryPreviewOptions = ({ id, token, settings }: IssueQueryProps) => {
  const variables = {
    id,
    projectFieldValue: settings?.project.customField,
    includeMilestone: true,
    includeComments: true,
    includeLabels: true,
    includeDevelopment: true,
  };

  return queryOptions({
    queryKey: getIssueQueryKey(id),
    queryFn: () =>
      githubRequest<IssueQueryResponse>({
        query: GQL_ISSUE_QUERY,
        variables,
        token: token || '',
      }),
    enabled: Boolean(id && token),
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (data) => data.node ?? undefined,
  });
};

export const useGitHubPreviewIssue = (props: IssueQueryProps) => {
  return useSuspenseQuery(issueQueryPreviewOptions(props));
};
