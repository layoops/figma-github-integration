import { createFileRoute } from '@tanstack/react-router';

import { issueQueryPreviewOptions } from '@/entities/issue';
import { IssuePage } from '@/pages/issue-page';
import { Loader } from '@/shared/ui';

export const Route = createFileRoute('/_layout/_protected/issue/$id')({
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
  errorComponent: () => <div>Error loading issue</div>,
  pendingComponent: () => <Loader />,
  pendingMs: 0,
});
