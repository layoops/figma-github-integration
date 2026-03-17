import { MESSAGE_TYPES } from '@/external/message-type';
import { useAppContext } from '@/shared/lib/contexts';

export const useRevokeAccess = () => {
  const { setGithubAccessToken, githubAccessToken } = useAppContext();
  const revoke = () => {
    if (!githubAccessToken) throw new Error('GitHub access token is missing');
    setGithubAccessToken(undefined);
    window.parent.postMessage(
      { pluginMessage: { type: MESSAGE_TYPES.REMOVE_GITHUB_TOKEN, data: {} } },
      '*'
    );
  };
  return revoke;
};
