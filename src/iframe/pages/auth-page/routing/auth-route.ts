import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { AuthPage } from '../ui';

export const authRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'auth',
  component: AuthPage,
});
