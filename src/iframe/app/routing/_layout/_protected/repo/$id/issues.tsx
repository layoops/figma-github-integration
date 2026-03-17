import { createFileRoute } from '@tanstack/react-router';

import { RepoIssuesPage } from '@/pages/repo-issues-page';

export const Route = createFileRoute('/_layout/_protected/repo/$id/issues')({
  component: RepoIssuesPage,
});
