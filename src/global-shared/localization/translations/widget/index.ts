import type { Locale } from '../../types/locales';
import type { WidgetLocalizationKeys } from '../../types/widget-localization-keys';

import { widgetEn } from './en';
import { widgetRu } from './ru';

export const widgetTranslations: Record<Locale, WidgetLocalizationKeys> = {
  en: widgetEn,
  ru: widgetRu,
};
