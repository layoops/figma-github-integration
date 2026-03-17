import {
  getDefaultLocale,
  getNestedValueWithFallback,
  getValidLocale,
  interpolate,
  type Locale,
  type WidgetTranslationKey,
  widgetTranslations,
} from '../../../../global-shared/localization';
import { useEffect, useSyncedState, useWidgetNodeId } from '../../../widget-components';
import { storageKeys } from '../storage-keys';
import { SYNC_KEYS } from '../sync-keys';

export type WidgetTranslationContext = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: WidgetTranslationKey, values?: Record<string, string | number>) => string;
};

async function loadLocaleFromStorage(): Promise<Locale | null> {
  try {
    if (typeof figma !== 'undefined' && figma.clientStorage) {
      const locale = await figma.clientStorage.getAsync(storageKeys.locale);
      return locale as Locale | null;
    }
  } catch (error) {
    console.warn('Failed to load locale from storage:', error);
  }
  return null;
}

export const useWidgetTranslation = (): WidgetTranslationContext => {
  const [locale, setLocaleState] = useSyncedState<Locale>(
    SYNC_KEYS.widget.settings.locale.locale,
    getDefaultLocale()
  );

  const widgetNodeId = useWidgetNodeId();

  const [isInitialized, setIsInitialized] = useSyncedState<boolean>(
    SYNC_KEYS.widget.settings.locale.widgetLocaleIsInitialized(widgetNodeId),
    false
  );

  useEffect(() => {
    if (!isInitialized) {
      const initializeLocale = async () => {
        try {
          const savedLocale = await loadLocaleFromStorage();

          if (savedLocale && (savedLocale === 'en' || savedLocale === 'ru')) {
            setLocaleState(savedLocale);
          }
        } catch (error) {
          console.warn('Failed to load saved locale, using default:', error);
        } finally {
          setIsInitialized(true);
        }
      };

      initializeLocale();
    }
  });

  const setLocale = (newLocale: Locale) => {
    const validatedLocale = getValidLocale(newLocale);
    setLocaleState(validatedLocale);
  };

  const t = (key: WidgetTranslationKey, values?: Record<string, string | number>): string => {
    const translation = getNestedValueWithFallback(widgetTranslations, locale, key);

    if (values) {
      return interpolate(translation, values);
    }

    return translation;
  };

  return {
    locale,
    setLocale,
    t,
  };
};
