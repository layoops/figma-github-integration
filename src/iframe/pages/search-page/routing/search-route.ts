import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { SearchPage } from '../ui';

export const searchRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'search',
  component: SearchPage,
  validateSearch: (search) => {
    return {
      q: typeof search.q === 'string' ? search.q : undefined,
    };
  },
});
