import { MESSAGE_TYPES } from '../../../../global-shared/message-type';
import { sendToIframe } from './post-message-to-iframe';

export const notifyInsertToFigmaSuccess = (message: string) => {
  figma.notify(message);

  sendToIframe({ type: MESSAGE_TYPES.INSERT_TO_FIGMA_STATUS, data: { status: 'done' } });
};
