import type { GithubEntity } from '../types';

import { useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';

import { useAppContext, useTranslation } from '../contexts';

export const useNavigateEntity = () => {
  const { githubAccessToken } = useAppContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getEntityPath = useCallback(
    (entity: GithubEntity): string => {
      if (!entity?.entity?.id || !githubAccessToken) {
        throw new Error(t('errors.invalidGithubData'));
      }

      switch (entity.entityType) {
        case 'issue':
          return ROUTES_MAP[ROUTES.ISSUE];
        case 'pull-request':
          return ROUTES_MAP[ROUTES.PULL_REQUEST];
        case 'project':
          return ROUTES_MAP[ROUTES.PROJECT];
        case 'repository':
        case 'repository-issues':
          return ROUTES_MAP[ROUTES.REPO_ISSUES];
        case 'repository-pulls':
          return ROUTES_MAP[ROUTES.REPO_PULL_REQUESTS];
        case 'repository-projects':
          return ROUTES_MAP[ROUTES.REPO_PROJECTS];

        default:
          throw new Error(t('errors.invalidLink'));
      }
    },
    [githubAccessToken, t]
  );

  const navigateToEntity = useCallback(
    async (entity: GithubEntity) => {
      setError(null);
      setLoading(true);

      try {
        const path = getEntityPath(entity);

        navigate({ to: path, params: { id: entity.entity.id } });

        return { path, id: entity.entity?.id };
      } catch (err) {
        const message = (err as Error)?.message || t('errors.unableToProcess');
        setError(message);
        console.error('Navigation error:', err);

        return null;
      } finally {
        setLoading(false);
      }
    },
    [navigate, getEntityPath, t]
  );

  return {
    loading,
    error,
    navigateToEntity,
  };
};
