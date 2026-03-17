import { createRoute } from '@tanstack/react-router';

import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { baseLayoutRoute } from '@/widgets/layout';

import { IssueCreatePage } from '../ui';

export const issueCreateRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: ROUTES_MAP[ROUTES.ISSUE_CREATE],
  component: IssueCreatePage,
});
