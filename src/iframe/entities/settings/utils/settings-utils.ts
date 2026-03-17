import type { ApplicationSettings } from '@/shared/lib/types';

import { MESSAGE_TYPES } from '../../../../global-shared/message-type';

export const sendSettingsToParent = (settings: ApplicationSettings) => {
  parent.postMessage(
    {
      pluginMessage: {
        type: MESSAGE_TYPES.SEND_GITHUB_SETTINGS,
        data: { settings },
      },
    },
    '*'
  );
};
