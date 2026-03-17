import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { IndexPage } from '../ui';

export const indexRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: '/',
  component: IndexPage,
});
