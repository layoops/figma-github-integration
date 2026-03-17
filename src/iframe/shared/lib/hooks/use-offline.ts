import { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslation } from '../contexts';

const OFFLINE_TIMEOUT = 3000;
const ONLINE_TIMEOUT = 1000;

export const useOffline = () => {
  const { t } = useTranslation();
  const [warning, setWarning] = useState<string>('');
  const hideToastRef = useRef<HTMLDivElement>(null);

  const showWarning = () => {
    if (!navigator.onLine) {
      setWarning(t('errors.offline'));
    }
  };

  const hideWarning = () => {
    if (navigator.onLine && hideToastRef && hideToastRef.current) {
      hideWarning();
    }
  };

  const handleOffline = useCallback(() => {
    setTimeout(showWarning, OFFLINE_TIMEOUT);
  }, []);

  const handleOnline = useCallback(() => {
    setTimeout(hideWarning, ONLINE_TIMEOUT);
  }, []);

  useEffect(() => {
    showWarning();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOffline, handleOnline]);

  return { hideToastRef, warning };
};
