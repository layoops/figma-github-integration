import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { useAppContext } from '@/shared/lib/contexts';
import { sendMessageToWidget } from '@/shared/lib/utils';

export const useRevokeAccess = () => {
  const { setGithubAccessToken, githubAccessToken } = useAppContext();
  const revoke = () => {
    if (!githubAccessToken) throw new Error('GitHub access token is missing');
    setGithubAccessToken(undefined);
    sendMessageToWidget({ type: MESSAGE_TYPES.REMOVE_GITHUB_TOKEN });
  };
  return revoke;
};
