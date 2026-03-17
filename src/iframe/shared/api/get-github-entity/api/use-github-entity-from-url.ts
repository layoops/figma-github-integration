import type { ParsedGithubEntity } from './parse-github-url';
import type { GithubEntity } from '@/shared/lib/types/github';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useAppContext } from '@/shared/lib/contexts';

import { resolveGithubEntityFromUrl } from './get-github-entity';
import { parseGithubUrl } from './parse-github-url';

export const getGithubEntityQueryKey = (entity: ParsedGithubEntity | null) => {
  if (!entity) {
    return ['github-entity', 'invalid'];
  }

  switch (entity.type) {
    case 'issue':
    case 'pull-request':
      return ['github-entity', entity.type, entity.owner, entity.repo, entity.number] as const;

    case 'repository':
      return ['github-entity', entity.type, entity.owner, entity.repo] as const;

    case 'project':
      return ['github-entity', entity.type, entity.owner, entity.number] as const;
  }
};

export const useGithubEntityFromUrl = (url: string, enabled: boolean) => {
  const { githubAccessToken } = useAppContext();
  const parsed = useMemo(() => parseGithubUrl(url), [url]);

  return useQuery<GithubEntity | null, Error>({
    queryKey: getGithubEntityQueryKey(parsed),
    queryFn: () => {
      if (!parsed || !githubAccessToken) {
        return null;
      }
      return resolveGithubEntityFromUrl({
        url,
        token: githubAccessToken,
      });
    },

    enabled: Boolean(enabled && parsed && githubAccessToken),

    retry: false,

    staleTime: 1000 * 60,
  });
};
