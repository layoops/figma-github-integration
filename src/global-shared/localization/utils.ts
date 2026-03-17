import type { Locale } from './types';

export function getDefaultLocale(): Locale {
  const supportedLanguages = {
    ru: ['ru', 'ru-ru', 'ru-by', 'ru-kz', 'ru-kg', 'ru-md', 'ru-ua'],
    en: ['en', 'en-us', 'en-gb', 'en-ca', 'en-au', 'en-nz', 'en-za'],
  };

  const detectLanguage = (locale: string): Locale => {
    const normalizedLocale = locale.toLowerCase().trim();

    for (const [lang, variants] of Object.entries(supportedLanguages)) {
      if (variants.includes(normalizedLocale)) {
        return lang as Locale;
      }
    }

    const langCode = normalizedLocale.substring(0, 2);
    for (const [lang, variants] of Object.entries(supportedLanguages)) {
      if (variants.some((variant) => variant.startsWith(langCode))) {
        return lang as Locale;
      }
    }

    return 'en';
  };

  if (typeof figma !== 'undefined' && (figma as any).locale) {
    try {
      const detectedLanguage = detectLanguage((figma as any).locale as string);

      return detectedLanguage;
    } catch (error) {
      console.warn('Failed to get Figma locale:', error);
    }
  }

  return 'en';
}

export function getNestedValueWithFallback(
  translations: Record<string, any>,
  locale: Locale,
  path: string
): string {
  let result = getNestedValue(translations[locale], path);

  if (result === path && locale !== 'en') {
    result = getNestedValue(translations['en'], path);
  }

  return result;
}

export function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path;
    }
  }

  return typeof result === 'string' ? result : path;
}

export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/{(\w+)}/g, (match, key) => {
    return values[key]?.toString() ?? match;
  });
}

export function isValidLocale(locale: string): locale is Locale {
  return locale === 'en' || locale === 'ru';
}

export function getSafeLocale(locale: string): Locale {
  return isValidLocale(locale) ? locale : 'en';
}

export function getValidLocale(locale: string): Locale {
  return isValidLocale(locale) ? locale : 'en';
}
