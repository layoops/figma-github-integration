import { createRoute } from '@tanstack/react-router';

import { rootRoute } from '@/shared/routing';

import { Layout } from '../ui';

export const baseLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
});
