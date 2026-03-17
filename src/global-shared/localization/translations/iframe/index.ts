import type { IframeLocalizationKeys } from '../../types/iframe-localization-keys';
import type { Locale } from '../../types/locales';

import { iframeEn } from './en';
import { iframeRu } from './ru';

export const iframeTranslations: Record<Locale, IframeLocalizationKeys> = {
  en: iframeEn,
  ru: iframeRu,
};
