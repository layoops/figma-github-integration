export { widgetTranslations, iframeTranslations } from './translations';
export type {
  IframeLocalizationKeys,
  IframeTranslationKey,
  Locale,
  WidgetLocalizationKeys,
  WidgetTranslationKey,
} from './types';
export {
  getDefaultLocale,
  getNestedValue,
  getNestedValueWithFallback,
  getSafeLocale,
  getValidLocale,
  interpolate,
  isValidLocale,
} from './utils';
export { getPluralSuffix, type PluralSuffix } from './pluralization';
