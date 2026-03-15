import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { ProjectPage } from '../ui';

export const projectRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'project/$id',
  component: ProjectPage,
});
