import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { ResyncPage } from '../ui';

export const resyncRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'resync',
  component: ResyncPage,
});
