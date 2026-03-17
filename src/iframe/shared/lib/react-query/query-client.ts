import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { UNAUTHORIZED_EVENT, UnauthorizedError } from '../auth';
import { GLOBAL_ERROR_EVENT, mapErrorToNotification } from '../errors/map-error';

const handleGlobalError = (error: unknown) => {
  if (error instanceof UnauthorizedError) {
    window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    return;
  }

  const notificationData = mapErrorToNotification(error);

  if (notificationData) {
    window.dispatchEvent(new CustomEvent(GLOBAL_ERROR_EVENT, { detail: notificationData }));
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof UnauthorizedError) {
          return false;
        }

        const errors = (error as any)?.response?.errors || (error as any)?.errors || [];
        if (errors[0]?.type === 'NOT_FOUND') {
          return false;
        }

        return failureCount < 2;
      },
    },
  },
});
