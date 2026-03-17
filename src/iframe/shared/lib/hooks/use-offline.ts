import { useCallback, useEffect, useRef, useState } from 'react';

const OFFLINE_TIMEOUT = 3000;
const ONLINE_TIMEOUT = 1000;
const message = 'You seem to be offline. Please check your connection.';

export const useOffline = () => {
  const [warning, setWarning] = useState<string>('');
  const hideToastRef = useRef<HTMLDivElement>(null);

  const showWarning = (string: string) => {
    if (!navigator.onLine) {
      setWarning(message);
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
    showWarning(message);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOffline, handleOnline]);

  return { hideToastRef, warning };
};
