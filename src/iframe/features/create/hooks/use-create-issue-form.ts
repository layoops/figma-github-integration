import { useRouter } from '@tanstack/react-router';
import * as v from 'valibot';

import { parseGithubUrl, resolveGithubEntityFromUrl } from '@/shared/api/get-github-entity';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { useAppForm } from '@/shared/lib/tanstack-react-form/global-form';

import { createDraftIssue } from '../model/create-draft-issue';
import { createIssue } from '../model/create-issue';

export type CreateIssueFormValues = {
  target: string;
  title: string;
  body: string;
  labelIds: string[];
};

type UseCreateIssueFormOptions = {
  defaultTarget?: string;
};

export const useCreateIssueForm = ({ defaultTarget = '' }: UseCreateIssueFormOptions) => {
  const { githubAccessToken } = useAppContext();
  const { t } = useTranslation();
  const router = useRouter();

  const schema = v.object({
    target: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(1, t('validation.required')),
      v.check((value) => {
        const parsed = parseGithubUrl(value);
        return parsed?.type === 'repository' || parsed?.type === 'project';
      }, t('validation.invalidTarget'))
    ),
    title: v.pipe(v.string(), v.trim(), v.minLength(1, t('validation.required'))),
    body: v.string(),
    labelIds: v.array(v.string()),
  });

  return useAppForm({
    defaultValues: {
      target: defaultTarget,
      title: '',
      body: '',
      labelIds: [],
    } as CreateIssueFormValues,
    validators: {
      onSubmitAsync: schema,
    },
    onSubmit: async ({ value }) => {
      if (!githubAccessToken) {
        throw new Error(t('errors.missingAccessToken'));
      }

      const entity = await resolveGithubEntityFromUrl({
        url: value.target,
        token: githubAccessToken,
      });

      if (!entity?.entity?.id) {
        throw new Error(t('errors.notFound'));
      }

      const { id } = entity.entity;
      const isProject = entity.entityType === 'project';

      const createdIssue = isProject
        ? await createDraftIssue({
            variables: { id, title: value.title, body: value.body },
            token: githubAccessToken,
          })
        : await createIssue({
            variables: { id, title: value.title, body: value.body, labelIds: value.labelIds },
            token: githubAccessToken,
          });

      if (createdIssue?.id) {
        router.navigate({ to: '/issue/$id', params: { id: createdIssue.id } });
      } else {
        router.history.back();
      }
    },
  });
};
