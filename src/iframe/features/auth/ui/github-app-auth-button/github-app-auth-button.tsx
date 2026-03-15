import { useEffect, useRef, useState } from 'react';
import { MarkGithubIcon } from '@primer/octicons-react';
import { Button, Flash, Text } from '@primer/react';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { SERVER_BASE_URL } from '@/global-shared/urls';
import { useTranslation } from '@/shared/lib/contexts';

import classes from './github-app-auth-button.module.css';

type GithubAppAuthButtonProps = {
  onTokenReceived: (token: string) => void;
  isDisabled?: boolean;
};

const SHORT_POLL_INTERVAL_MS = 3000;
const LONG_POLL_INTERVAL_MS = 5000;
const SHORT_POLL_ATTEMPTS_COUNT = 8;
const MAX_POLL_ATTEMPTS = 30;

export const GithubAppAuthButton = ({ onTokenReceived, isDisabled }: GithubAppAuthButtonProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<Error | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollAttemptCountRef = useRef<number>(0);

  const stopPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    pollAttemptCountRef.current = 0;
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const setPollingInterval = (fetchToken: () => Promise<void>) => {
    stopPolling();

    const currentInterval =
      pollAttemptCountRef.current < SHORT_POLL_ATTEMPTS_COUNT
        ? SHORT_POLL_INTERVAL_MS
        : LONG_POLL_INTERVAL_MS;

    pollIntervalRef.current = setInterval(fetchToken, currentInterval);
  };

  const startAuth = async () => {
    setIsLoading(true);
    setAuthError(null);
    stopPolling();

    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/github/auth`);
      if (!response.ok) throw new Error(t('errors.failedToConnect'));

      const { authorizeUrl, stateId } = await response.json();
      if (!authorizeUrl) throw new Error(t('errors.invalidAuthUrl'));

      parent.postMessage(
        { pluginMessage: { type: MESSAGE_TYPES.OPEN_URL, data: { url: authorizeUrl } } },
        '*'
      );

      const fetchToken = async () => {
        try {
          pollAttemptCountRef.current++;

          if (pollAttemptCountRef.current > MAX_POLL_ATTEMPTS) {
            stopPolling();
            setIsLoading(false);
            setAuthError(new Error(t('errors.authTimeout')));
            return;
          }

          if (pollAttemptCountRef.current === SHORT_POLL_ATTEMPTS_COUNT + 1) {
            setPollingInterval(fetchToken);
          }

          const pollRes = await fetch(`${SERVER_BASE_URL}/api/github/poll?id=${stateId}`);
          if (pollRes.ok) {
            const data = await pollRes.json();
            if (data.complete && data.token) {
              stopPolling();
              setIsLoading(false);
              onTokenReceived(data.token);
              return;
            }
          }
        } catch (e: any) {
          console.error('Polling error:', e);
        }
      };

      await fetchToken();

      if (!pollIntervalRef.current) {
        setPollingInterval(fetchToken);
      }
    } catch (e: any) {
      stopPolling();
      setIsLoading(false);
      setAuthError(e);
    }
  };

  return (
    <div className={classes['github-app-auth-button']}>
      {authError && (
        <Flash variant="danger">
          <Text>{authError.message}</Text>
        </Flash>
      )}

      <Button
        variant="primary"
        size="large"
        onClick={startAuth}
        loading={isLoading}
        disabled={isDisabled}
        leadingVisual={MarkGithubIcon}
        block
      >
        {isLoading
          ? t('authorizationPage.connectingToGitHub')
          : t('authorizationPage.loginWithGitHub')}
      </Button>
    </div>
  );
};
