import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext, useContext, useState } from 'react';

import {
  getDefaultLocale,
  getNestedValueWithFallback,
  getPluralSuffix,
  getValidLocale,
  type IframeTranslationKey,
  iframeTranslations,
  interpolate,
  type Locale,
} from '../../../../global-shared/localization';
import { MESSAGE_TYPES } from '../../../../global-shared/message-type';
import { sendMessageToWidget } from '../utils/send-message-to-widget';

export type InternationalizationContextProps = {
  locale: Locale;
  sendLocale: (locale: Locale) => void;
  setLocale: Dispatch<SetStateAction<Locale>>;
  t: (key: IframeTranslationKey, values?: Record<string, string | number>) => string;
};

export const InternationalizationContext = createContext<
  InternationalizationContextProps | undefined
>(undefined);

export type InternationalizationProviderProps = {
  children: ReactNode;
};

export const InternationalizationProvider = ({ children }: InternationalizationProviderProps) => {
  const [locale, setLocale] = useState<Locale>(getDefaultLocale());

  const sendLocale = async (newLocale: Locale) => {
    const validatedLocale = getValidLocale(newLocale);
    setLocale(validatedLocale);

    sendMessageToWidget({ type: MESSAGE_TYPES.SET_LOCALE, data: { locale: validatedLocale } });
  };

  const t = (key: IframeTranslationKey, values?: Record<string, string | number>): string => {
    let translation = '';

    const countVal = values?.count ?? values?.selectedCount;

    if (typeof countVal === 'number') {
      const suffix = getPluralSuffix(locale, countVal);

      const pluralKey = `${key}_${suffix}`;
      const pluralTranslation = getNestedValueWithFallback(
        iframeTranslations,
        locale,
        pluralKey as any
      );

      if (pluralTranslation && pluralTranslation !== pluralKey) {
        translation = pluralTranslation;
      } else {
        const otherKey = `${key}_other`;
        const otherTranslation = getNestedValueWithFallback(
          iframeTranslations,
          locale,
          otherKey as any
        );
        translation = otherTranslation !== otherKey ? otherTranslation : '';
      }
    }

    if (!translation) {
      translation = getNestedValueWithFallback(iframeTranslations, locale, key);
    }

    if (values) {
      return interpolate(translation, values);
    }

    return translation;
  };

  const contextValue: InternationalizationContextProps = {
    locale,
    sendLocale,
    setLocale,
    t,
  };

  return (
    <InternationalizationContext.Provider value={contextValue}>
      {children}
    </InternationalizationContext.Provider>
  );
};

export const useTranslation = (): InternationalizationContextProps => {
  const context = useContext(InternationalizationContext);

  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }

  return context;
};
