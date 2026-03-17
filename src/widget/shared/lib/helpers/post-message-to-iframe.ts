import type { WidgetToIframeMessage } from '../../../../global-shared/plugin-messages';

export const sendToIframe = (message: WidgetToIframeMessage): void => {
  figma.ui.postMessage(message, { origin: '*' });
};
