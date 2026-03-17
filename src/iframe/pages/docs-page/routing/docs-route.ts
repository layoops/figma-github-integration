import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { DocsPage } from '../ui';

export const docsRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'docs',
  component: DocsPage,
});
