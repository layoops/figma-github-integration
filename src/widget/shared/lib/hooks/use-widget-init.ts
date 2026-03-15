import type { IframeToWidgetMessage } from '../../../../global-shared/plugin-messages';
import type { WidgetType } from '../types';

import { MESSAGE_TYPES } from '../../../../global-shared/message-type';
import { useInsertGithubEntitiesToWidget } from '../../../features/import';
import { openPluginSettingsPage } from '../../../features/open-iframe';
import {
  useEffect,
  usePropertyMenu,
  useSyncedState,
  waitForTask,
} from '../../../widget-components';
import { IconSettings } from '../../ui/icons';
import { sendGithubAuthTokenWithSettings, setAsyncStorage } from '../helpers';
import { sendToIframe } from '../helpers/post-message-to-iframe';
import { storageKeys } from '../storage-keys';
import { SYNC_KEYS } from '../sync-keys';
import { removeToken } from '../tokens';
import { useWidgetTranslation } from './use-widget-translation';

export const useWidgetInit = () => {
  const [widgetType] = useSyncedState<WidgetType>(SYNC_KEYS.widget.type, 'init');

  const { t } = useWidgetTranslation();

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
      openPluginSettingsPage();
    }
  });

  const {
    insertGithubIssueWidget,
    insertGithubIssuesWidget,
    importGithubEntityByQuery,
    insertGithubProjectWidget,
    insertGithubPullRequestWidget,
  } = useInsertGithubEntitiesToWidget();

  useEffect(() => {
    figma.ui.onmessage = async (msg: IframeToWidgetMessage) => {
      const closeAfterImport = 'closeAfterImport' in msg ? (msg.closeAfterImport ?? true) : true;

      switch (msg.type) {
        case MESSAGE_TYPES.OPEN_URL: {
          if (msg.data.url) {
            figma.openExternal(msg.data.url);
          }
          break;
        }
        case MESSAGE_TYPES.GET_GITHUB_AUTH_TOKEN:
          sendGithubAuthTokenWithSettings();
          break;
        case MESSAGE_TYPES.REMOVE_GITHUB_TOKEN:
          await removeToken();
          figma.notify(t('success.tokenRemoved'));
          figma.closePlugin();
          break;
        case MESSAGE_TYPES.SEND_GITHUB_TOKEN:
          setAsyncStorage({ key: storageKeys.accessToken, value: msg.token });
          figma.notify(t('success.tokenAuthorized'));
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_ISSUE:
        case MESSAGE_TYPES.IMPORT_GITHUB_PROJECT_ISSUE:
          insertGithubIssueWidget({ data: msg.data });
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_ISSUES:
          insertGithubIssuesWidget({ data: msg.data, closeAfterImport });
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_QUERY_ISSUE:
          importGithubEntityByQuery({ data: msg.data });
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_PROJECT:
          insertGithubProjectWidget({ data: msg.data });
          break;
        case MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST:
          insertGithubPullRequestWidget({ data: msg.data });
          break;
        case MESSAGE_TYPES.SEND_GITHUB_SETTINGS:
          setAsyncStorage({ key: storageKeys.settings, value: msg.data.settings });
          figma.notify(t('success.settingsSaved'));
          break;
        case MESSAGE_TYPES.SET_LOCALE:
          setAsyncStorage({ key: storageKeys.locale, value: msg.data.locale });
          break;
        case MESSAGE_TYPES.GET_LOCALE:
          waitForTask(
            new Promise(() => {
              (async () => {
                const locale = await figma.clientStorage.getAsync(storageKeys.locale);
                sendToIframe({ type: MESSAGE_TYPES.GET_LOCALE_RESPONSE, data: { locale } });
              })();
            })
          );
          break;
        case MESSAGE_TYPES.RESYNC_GITHUB_ISSUE_RESPONSE:
          figma.notify(t('success.issueResynced'));
          figma.closePlugin();
          break;
        case MESSAGE_TYPES.RESYNC_ERROR:
          figma.notify(t('notifications.unableToResync'));
          figma.closePlugin();
          break;
        case MESSAGE_TYPES.CLOSE_PLUGIN:
          figma.closePlugin();
          break;
        default:
          console.warn('Unknown message type:', (msg as { type: unknown }).type);
      }
    };
  });

  return { widgetType };
};
