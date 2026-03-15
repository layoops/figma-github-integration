import { useRouter } from '@tanstack/react-router';
import * as v from 'valibot';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { parseGithubUrl, resolveGithubEntityFromUrl } from '@/shared/api/get-github-entity';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { useAppForm } from '@/shared/lib/tanstack-react-form/global-form';
import { sendMessageToWidget } from '@/shared/lib/utils';

import { createDraftIssue } from '../model/create-draft-issue';
import { createIssue } from '../model/create-issue';

export type CreateIssueFormValues = {
  target: string;
  title: string;
  body: string;
};

type UseCreateIssueFormOptions = {
  importIssue: boolean;
};

export const useCreateIssueForm = ({ importIssue }: UseCreateIssueFormOptions) => {
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
  });

  return useAppForm({
    defaultValues: {
      target: '',
      title: '',
      body: '',
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
            variables: { id, title: value.title, body: value.body },
            token: githubAccessToken,
          });

      if (importIssue && createdIssue) {
        sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUE, data: createdIssue });
      }

      router.history.back();
    },
  });
};
