import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { PullRequestPage } from '../ui';

export const pullRequestRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'pull-request/$id',
  component: PullRequestPage,
});
