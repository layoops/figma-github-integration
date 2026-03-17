import type { User as UserType } from '@octokit/graphql-schema';

import { githubGraphqlApi } from '../../graphql/github-graphql-api';

const GET_VIEWER_QUERY = `query Viewer {
  viewer {
    login
    avatarUrl
  }
}
`;

export const getViewer = async ({ token }: { token: string }) => {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: GET_VIEWER_QUERY,
    }),
  });

  const data = await response.json();
  try {
    return data.data.viewer as UserType;
  } catch (error) {
    throw new Error(data.message);
  }
};
