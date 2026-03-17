import { MESSAGE_TYPES } from '../../../../global-shared/message-type';
import { useGithubImport } from '../../../features/import';
import { openSettingsIframe } from '../../../features/open-iframe';
import {
  useEffect,
  usePropertyMenu,
  useSyncedState,
  waitForTask,
} from '../../../widget-components';
import { IconSettings } from '../../ui/icons';
import { setAsyncStorage } from '../helpers/storage';
import { storageKeys } from '../storage-keys';
import { removeToken } from '../tokens';

export type WidgetType = 'init' | 'issue' | 'project' | 'pull-request';

const getGithubAuthTokenWithSettings = () => {
  waitForTask(
    new Promise(() => {
      (async () => {
        const githubAuthToken = await figma.clientStorage.getAsync(storageKeys.accessToken);
        const settings = await figma.clientStorage.getAsync(storageKeys.settings);
        figma.ui.postMessage(
          {
            type: MESSAGE_TYPES.GET_GITHUB_AUTH_TOKEN_RESPONSE,
            data: { githubAuthToken, settings },
          },
          { origin: '*' }
        );
      })();
    })
  );
};

export const useWidgetInit = () => {
  const [widgetType] = useSyncedState<WidgetType>('widgetType', 'init');
  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      itemType: 'action',
      propertyName: 'settings',
      tooltip: 'Reset',
      icon: `${IconSettings('white')}`,
    },
  ];

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'settings') {
      openSettingsIframe();
    }
  });

  const {
    importGithubIssue,
    importGithubEntityByQuery,
    importGithubProject,
    importGithubPullRequest,
  } = useGithubImport();

  useEffect(() => {
    figma.ui.onmessage = async (msg: { data: any; type: MESSAGE_TYPES; token: string }) => {
      switch (msg.type) {
        case MESSAGE_TYPES.GET_GITHUB_AUTH_TOKEN:
          getGithubAuthTokenWithSettings();
          break;
        case MESSAGE_TYPES.REMOVE_GITHUB_TOKEN:
          await removeToken();
          figma.notify('Successfully Removed Github API Token!');
          figma.closePlugin();
          break;
        case MESSAGE_TYPES.SEND_GITHUB_TOKEN:
          setAsyncStorage({ key: storageKeys.accessToken, value: msg.token, close: true });
          figma.notify('Successfully authorized Github API Token!');
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_ISSUE:
        case MESSAGE_TYPES.IMPORT_GITHUB_PROJECT_ISSUE:
          importGithubIssue({ data: msg.data });
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_QUERY_ISSUE:
          importGithubEntityByQuery({ data: msg.data });
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_PROJECT:
          importGithubProject({ data: msg.data });
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST:
          importGithubPullRequest({ data: msg.data, type: 'import-github-pull-request' });
          break;
        case MESSAGE_TYPES.SEND_GITHUB_SETTINGS:
          setAsyncStorage({ key: storageKeys.settings, value: msg.data.settings });
          figma.notify('Successfully save new settings!');
          break;
        case MESSAGE_TYPES.RESYNC_GITHUB_ISSUE_RESPONSE:
          figma.notify('Github issue resynced!');
          figma.closePlugin();
          break;
        case MESSAGE_TYPES.RESYNC_ERROR:
          figma.notify('Unable to resync at this time, please try again.');
          figma.closePlugin();
          break;
        case MESSAGE_TYPES.CLOSE_PLUGIN:
          figma.closePlugin();
          break;
        default:
          console.warn('Unknown message type:', msg.type);
      }
    };
  });

  return { widgetType };
};
