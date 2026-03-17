import type { Locale } from '../../../global-shared/localization/types';

import { storageKeys } from './storage-keys';

export const getToken = async (): Promise<string> => {
  const token = await figma.clientStorage.getAsync(storageKeys.accessToken);

  return token;
};

export const removeToken = async () => {
  const token = await figma.clientStorage.deleteAsync(storageKeys.accessToken);

  return token;
};

export async function loadLocaleFromStorage(): Promise<Locale> {
  const stored = await figma.clientStorage.getAsync(storageKeys.locale);

  return stored;
}
