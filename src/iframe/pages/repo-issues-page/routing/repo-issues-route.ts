import { createRoute } from '@tanstack/react-router';

import { repoLayoutRoute } from '@/widgets/repo-layout';

import { RepoIssuesPage } from '../ui';

export const repoIssuesRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: 'issues',
  component: RepoIssuesPage,
});
