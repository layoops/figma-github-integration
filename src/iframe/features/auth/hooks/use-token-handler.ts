import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { getViewer } from '@/shared/api/get-github-user';
import { useAppContext } from '@/shared/lib/contexts';

export const useTokenHandler = () => {
  const { setGithubAccessToken, setViewer } = useAppContext();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleToken = async (token: string) => {
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
            },
          },
          '*'
        );
        setGithubAccessToken(token);
        setViewer(viewer);
        navigate({ to: ROUTES_MAP[ROUTES.INDEX] });
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
