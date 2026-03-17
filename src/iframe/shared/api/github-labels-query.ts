import { useQuery } from '@tanstack/react-query';

import { useAppContext } from '../lib/contexts';
import { parseGithubUrl } from './get-github-entity';
import { githubRequest } from './graphql/github-graphql-api';
import { GQL_REPO_LABELS_QUERY } from './graphql/queries/repo/gql-repo-labels';

export type RepositoryLabel = {
  id: string;
  name: string;
  color: string;
  description: string | null;
};

type LabelsQueryResponse = {
  repository: {
    labels: { nodes: RepositoryLabel[] } | null;
  } | null;
};

export async function getRepositoryLabels({
  owner,
  name,
  token,
}: {
  owner: string;
  name: string;
  token: string;
}): Promise<RepositoryLabel[]> {
  const response = await githubRequest<LabelsQueryResponse>({
    query: GQL_REPO_LABELS_QUERY,
    variables: { owner, name },
    token,
  });

  return response?.repository?.labels?.nodes ?? [];
}

type UseRepositoryLabelsOptions = {
  enabled?: boolean;
};

export const useRepositoryLabels = (target: string, options?: UseRepositoryLabelsOptions) => {
  const { githubAccessToken } = useAppContext();

  const parsed = parseGithubUrl(target);
  const isRepository = parsed?.type === 'repository';

  const owner = isRepository ? parsed.owner : undefined;
  const name = isRepository ? parsed.repo : undefined;

  const query = useQuery({
    queryKey: ['repository-labels', owner, name],
    queryFn: () =>
      getRepositoryLabels({
        owner: owner!,
        name: name!,
        token: githubAccessToken!,
      }),
    enabled:
      Boolean(isRepository && owner && name && githubAccessToken) && (options?.enabled ?? true),
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    isReady: Boolean(isRepository && owner && name && githubAccessToken),
  };
};
