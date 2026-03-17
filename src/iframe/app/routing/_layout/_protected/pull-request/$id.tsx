import { createFileRoute } from '@tanstack/react-router';

import { pullRequestQueryOptions } from '@/entities/pull-request';
import { PullRequestPage } from '@/pages/pull-request-page';
import { Loader } from '@/shared/ui';

export const Route = createFileRoute('/_layout/_protected/pull-request/$id')({
  component: PullRequestPage,
  loader: ({ context, params }) => {
    const { queryClient, auth } = context;
    return queryClient.ensureQueryData(
      pullRequestQueryOptions({
        id: params.id,
        token: auth.token,
        settings: auth.settings,
      })
    );
  },
  errorComponent: () => <div>Error loading pull request</div>,
  pendingComponent: () => <Loader />,
  pendingMs: 0,
});
