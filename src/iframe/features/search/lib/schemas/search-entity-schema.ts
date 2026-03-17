import type { IframeTranslationKey } from '@/global-shared/localization';

import * as v from 'valibot';

import { parseGithubUrl } from '@/shared/api/get-github-entity';
import { githubQuerySearchPatterns } from '@/shared/lib/regex';

export const createSearchEntitySchema = (t: (key: IframeTranslationKey) => string) =>
  v.object({
    query: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(1, t('validation.required')),
      v.check((value) => {
        if (parseGithubUrl(value)) {
          return true;
        }

        return githubQuerySearchPatterns.repo.test(value);
      }, t('validation.repoRequiredForSearch'))
    ),
  });
