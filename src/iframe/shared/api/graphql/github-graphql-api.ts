import { ClientError, GraphQLClient } from 'graphql-request';

import { GITHUB_GRAPHQL_API_URL } from '@/global-shared/urls';
import { UnauthorizedError } from '@/shared/lib/auth';

const client = new GraphQLClient(GITHUB_GRAPHQL_API_URL, { errorPolicy: 'all' });

export const githubRequest = async <T = any>({
  query,
  variables,
  token,
}: {
  query: string;
  variables?: Record<string, any>;
  token?: string;
}): Promise<T> => {
  try {
    return await client.request<T>(query, variables, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  } catch (error) {
    if (error instanceof ClientError) {
      if (error.response.status === 401) {
        throw new UnauthorizedError('Unauthorized: GitHub token is invalid or expired.');
      }

      const customError = new Error(
        `GitHub API Error (HTTP ${error.response.status}): ${JSON.stringify(error.response.errors || error.response.data)}`
      );
      (customError as any).originalError = error;
      throw customError;
    }

    throw error;
  }
};

export const githubGraphqlApi = async ({
  body,
  token,
}: {
  body: any | undefined;
  token: string;
}) => {
  const response = await fetch(GITHUB_GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body,
  });

  return response;
};
