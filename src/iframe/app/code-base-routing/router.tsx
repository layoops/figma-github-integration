import { createMemoryHistory, createRoute, createRouter } from '@tanstack/react-router';

import { authRoute } from '@/pages/auth-page';
import { docsRoute } from '@/pages/docs-page';
import { indexRoute } from '@/pages/index-page';
import { issueCreateRoute } from '@/pages/issue-create-page';
import { issueRoute } from '@/pages/issue-page';
import { projectRoute } from '@/pages/project-page';
import { pullRequestRoute } from '@/pages/pull-request-page';
import { repoIssuesRoute } from '@/pages/repo-issues-page';
import { repoProjectsRoute } from '@/pages/repo-projects-page';
import { repoPullRequestsRoute } from '@/pages/repo-pull-requests-page';
import { resyncRoute } from '@/pages/resync-page';
import { searchRoute } from '@/pages/search-page';
import { settingsRoute } from '@/pages/settings-page';
import { queryClient } from '@/shared/lib/react-query';
import { rootRoute } from '@/shared/routing/root-route';
import { baseLayoutRoute } from '@/widgets/layout';
import { repoLayoutRoute } from '@/widgets/repo-layout';

export const memoryHistory = createMemoryHistory({ initialEntries: ['/'] });

export const protectedRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  id: 'protected',
});

const routeTree = rootRoute.addChildren([
  baseLayoutRoute.addChildren([
    indexRoute,
    protectedRoute.addChildren([
      issueRoute,
      issueCreateRoute,
      pullRequestRoute,
      projectRoute,
      repoLayoutRoute.addChildren([repoIssuesRoute, repoPullRequestsRoute, repoProjectsRoute]),
      searchRoute,
      resyncRoute,
    ]),
    authRoute,
    settingsRoute,
    docsRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  history: memoryHistory,
  context: {
    queryClient,
    auth: { token: undefined, settings: undefined },
  },
});

// declare module '@tanstack/react-router' {
//   // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
//   interface Register {
//     router: typeof router;
//   }
// }
