import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { useAppContext } from '@/shared/lib/contexts';
import { sendMessageToWidget } from '@/shared/lib/utils';
import { router } from '@/shared/routing';

export const useRevokeAccess = () => {
  const { setGithubAccessToken, githubAccessToken, setViewer } = useAppContext();
  const revoke = () => {
    if (!githubAccessToken) throw new Error('GitHub access token is missing');
    setGithubAccessToken(undefined);
    setViewer(undefined);
    router.update({
      context: { ...router.options.context, auth: { token: undefined } },
    });
    sendMessageToWidget({ type: MESSAGE_TYPES.REMOVE_GITHUB_TOKEN });
  };
  return revoke;
};
