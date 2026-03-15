import type { WidgetToIframeMessage } from '@/global-shared/plugin-messages';

import { useEffect, useState } from 'react';

import { MESSAGE_TYPES } from '@/global-shared/message-type';

export const useImportEntityStatusFromWidget = () => {
  const [importStatus, setImportStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent<{ pluginMessage: WidgetToIframeMessage }>) => {
      const msg = event.data?.pluginMessage;

      if (!msg) {
        return;
      }

      if (msg.type === MESSAGE_TYPES.INSERT_TO_FIGMA_STATUS) {
        setImportStatus(msg.data.status);
        return;
      }
    };

    window.addEventListener('message', handleWindowMessage);

    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, []);

  return {
    importStatus,
    setImportStatus,
  };
};
