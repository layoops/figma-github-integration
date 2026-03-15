import { MESSAGE_TYPES } from '../../../../global-shared/message-type';
import { waitForTask } from '../../../widget-components';
import { getGithubAuthTokenWithSettings } from './get-github-auth-token-with-settings';

export const openPluginUI = (input: {
  routeName: string;
  props?: any;
  other?: Record<string, any>;
  options?: Pick<ShowUIOptions, 'visible'>;
}) => {
  const {
    routeName,
    props,
    options: { visible },
    other,
  } = input;

  const route = routeName.startsWith('/') ? routeName : `/${routeName}`;

  waitForTask(
    new Promise(() => {
      figma.showUI(`${__uiFiles__['main']}`, {
        width: 440,
        height: 540,
        visible,
      });

      setTimeout(() => {
        (async () => {
          const { githubAuthToken, settings, locale } = await getGithubAuthTokenWithSettings();
          figma.ui.postMessage(
            {
              type: MESSAGE_TYPES.SET_ROUTE,
              data: { route: route, props, githubAuthToken, settings, locale },
              ...other,
            },
            { origin: '*' }
          );
        })();
      }, 100);
    })
  );
};
