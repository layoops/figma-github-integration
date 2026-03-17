import { createRoute } from '@tanstack/react-router';

import { repoLayoutRoute } from '@/widgets/repo-layout';

import { RepoProjectsPage } from '../ui';

export const repoProjectsRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: 'projects',
  component: RepoProjectsPage,
});
