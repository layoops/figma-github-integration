import { createFileRoute } from '@tanstack/react-router';

import { RepoPullRequestsPage } from '@/pages/repo-pull-requests-page';

export const Route = createFileRoute('/_layout/_protected/repo/$id/pull-requests')({
  component: RepoPullRequestsPage,
});
