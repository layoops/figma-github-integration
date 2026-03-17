import { MESSAGE_TYPES } from '../../../../global-shared/message-type';
import { waitForTask } from '../../../widget-components';
import { getGithubAuthTokenWithSettings } from './get-github-auth-token-with-settings';
import { sendToIframe } from './post-message-to-iframe';

export const sendGithubAuthTokenWithSettings = () => {
  waitForTask(
    new Promise(() => {
      (async () => {
        const { githubAuthToken, settings, locale } = await getGithubAuthTokenWithSettings();

        sendToIframe({
          type: MESSAGE_TYPES.GET_GITHUB_AUTH_TOKEN_RESPONSE,
          data: { githubAuthToken, settings, locale },
        });
      })();
    })
  );
};
