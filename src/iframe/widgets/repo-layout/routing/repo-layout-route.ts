import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { RepoLayout } from '../ui';

export const repoLayoutRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'repo/$id',
  component: RepoLayout,
});
