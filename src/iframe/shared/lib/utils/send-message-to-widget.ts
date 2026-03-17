import type { IframeToWidgetMessage } from '@/global-shared/plugin-messages';

export const sendMessageToWidget = (message: IframeToWidgetMessage): void => {
  window.parent.postMessage({ pluginMessage: message }, '*');
};
