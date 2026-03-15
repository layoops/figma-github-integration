import { createRoute } from '@tanstack/react-router';

import { issueQueryPreviewOptions } from '@/entities/issue';
import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { Loader } from '@/shared/ui';
import { baseLayoutRoute } from '@/widgets/layout';

import { IssuePage } from '../ui';

export const issueRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: ROUTES_MAP[ROUTES.ISSUE],
  component: IssuePage,
  loader: ({ context, params }) => {
    const { queryClient, auth } = context;
    return queryClient.ensureQueryData(
      issueQueryPreviewOptions({
        id: params.id,
        token: auth.token,
        settings: auth.settings,
      })
    );
  },
  pendingMs: 0,
  errorComponent: () => <div>Error loading issue</div>,
  pendingComponent: () => <Loader />,
});
