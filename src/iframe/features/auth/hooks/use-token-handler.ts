import { useState } from 'react';
import { createMemoryHistory } from '@tanstack/react-router';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { getViewer } from '@/shared/api/get-github-user';
import { useAppContext } from '@/shared/lib/contexts';
import { router } from '@/shared/routing';

export const useTokenHandler = () => {
  const { setGithubAccessToken, setViewer } = useAppContext();
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleToken = async (token: string, source: 'oauth' | 'manual' = 'manual') => {
    setIsVerifying(true);
    setError(null);
    try {
      const viewer = await getViewer({ token });

      if (viewer) {
        parent.postMessage(
          {
            pluginMessage: {
              type: MESSAGE_TYPES.SEND_GITHUB_TOKEN,
              token: token,
              source,
            },
          },
          '*'
        );
        setGithubAccessToken(token);
        setViewer(viewer);

        const indexRoute = ROUTES_MAP[ROUTES.INDEX];
        const freshHistory = createMemoryHistory({ initialEntries: [indexRoute] });

        router.update({
          context: {
            ...router.options.context,
            auth: { token, settings: router.options.context.auth?.settings },
          },
          history: freshHistory,
        });

        freshHistory.subscribe(() => router.load());
        router.navigate({ to: indexRoute, replace: true });
      } else {
        throw new Error('Invalid token');
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsVerifying(false);
    }
  };

  return { handleToken, isVerifying, error };
};
