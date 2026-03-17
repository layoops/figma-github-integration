import type { ApplicationSettings } from '../lib/types';
import type { QueryClient } from '@tanstack/react-query';

import { createRootRouteWithContext } from '@tanstack/react-router';

import { Providers } from '@/app/providers';

type RouterContext = {
  queryClient: QueryClient;
  auth: {
    token?: string;
    settings?: ApplicationSettings;
  };
};

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Providers,
});
