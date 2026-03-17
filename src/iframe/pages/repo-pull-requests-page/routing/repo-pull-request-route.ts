import { createRoute } from '@tanstack/react-router';

import { repoLayoutRoute } from '@/widgets/repo-layout';

import { RepoPullRequestsPage } from '../ui';

export const repoPullRequestsRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: 'pull-requests',
  component: RepoPullRequestsPage,
});
