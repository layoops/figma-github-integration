import type { Locale } from './types';

export type PluralSuffix = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export const getPluralSuffix = (locale: Locale, count: number): PluralSuffix => {
  try {
    const pr = new Intl.PluralRules(locale);
    return pr.select(count) as PluralSuffix;
  } catch (_e: unknown) {
    return 'other';
  }
};
