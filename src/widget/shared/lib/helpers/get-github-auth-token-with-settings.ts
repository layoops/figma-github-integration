import { storageKeys } from '../storage-keys';

export const getGithubAuthTokenWithSettings = async () => {
  const githubAuthToken = await figma.clientStorage.getAsync(storageKeys.accessToken);
  const settings = await figma.clientStorage.getAsync(storageKeys.settings);
  const locale = await figma.clientStorage.getAsync(storageKeys.locale);

  return {
    githubAuthToken,
    settings,
    locale,
  };
};
