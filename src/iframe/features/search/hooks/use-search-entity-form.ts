import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import {
  getGithubEntityQueryKey,
  parseGithubUrl,
  resolveGithubEntityFromUrl,
} from '@/shared/api/get-github-entity';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { useNavigateEntity } from '@/shared/lib/hooks/use-navigate-entity';
import { useAppForm } from '@/shared/lib/tanstack-react-form/global-form';

import { createSearchEntitySchema } from '../lib';

export type SearchFormValues = {
  query: string;
};

export const useSearchEntityForm = () => {
  const { githubAccessToken } = useAppContext();
  const { t } = useTranslation();
  const { navigateToEntity } = useNavigateEntity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const searchEntitySchema = useMemo(() => createSearchEntitySchema(t), [t]);

  const form = useAppForm({
    defaultValues: {
      // query: 'https://github.com/users/vitaly-astakhov/projects/1',
      // query: 'https://github.com/apache/echarts',
      // query: 'https://github.com/vitaly-astakhov/public-playground',
      query: 'repo:vitaly-astakhov/public-playground type:issue state:open',
    },
    validators: {
      onSubmitAsync: searchEntitySchema,
    },
    onSubmit: async ({ value }) => {
      if (!githubAccessToken) {
        throw new Error(t('errors.missingAccessToken'));
      }

      const parsed = parseGithubUrl(value.query);
      const isGithubUrl = parsed !== null;

      if (isGithubUrl) {
        const queryKey = getGithubEntityQueryKey(parsed);

        try {
          const data = await queryClient.fetchQuery({
            queryKey,
            queryFn: () =>
              resolveGithubEntityFromUrl({
                url: value.query,
                token: githubAccessToken,
              }),
          });

          if (data && data.entity?.id) {
            await navigateToEntity(data);
          } else {
            throw new Error(t('errors.notFound'));
          }
        } catch (error) {
          console.error('Form submit error:', error);
          throw error;
        }
      } else {
        navigate({ to: ROUTES_MAP[ROUTES.SEARCH], search: { q: value.query } });
      }
    },
  });

  return form;
};
