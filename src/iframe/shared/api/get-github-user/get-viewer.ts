import type { User } from '@octokit/graphql-schema';

import { useQuery } from '@tanstack/react-query';

import { useAppContext } from '@/shared/lib/contexts';

import { githubRequest } from '../graphql/github-graphql-api';

const GQL_GET_VIEWER_QUERY = `query Viewer {
  viewer {
    login
    avatarUrl
  }
}
`;

type GetViewerResponse = {
  viewer: User | null;
};

export const useGitHubViewer = (accessToken?: string) => {
  const context = useAppContext();
  const token = accessToken ?? context.githubAccessToken;

  return useQuery<GetViewerResponse, Error, User | undefined>({
    queryKey: ['github-viewer', token],
    queryFn: () => githubRequest<GetViewerResponse>({ query: GQL_GET_VIEWER_QUERY, token }),
    enabled: Boolean(token),
    retry: false,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.viewer ?? undefined,
  });
};

export const getViewer = async ({ token }: { token: string }) => {
  const data = await githubRequest({ query: GQL_GET_VIEWER_QUERY, token });

  try {
    return data.viewer as User;
  } catch {
    throw new Error(data.message);
  }
};
