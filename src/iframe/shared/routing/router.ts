import { createMemoryHistory, createRouter } from '@tanstack/react-router';

import { queryClient } from '../lib/react-query';
import { routeTree } from './routeTree.gen';

export const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
});

export const router = createRouter({
  routeTree,
  history: memoryHistory,
  context: {
    queryClient,
    auth: {
      token: undefined,
      settings: undefined,
    },
  },
  // defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}
