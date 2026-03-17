import { createFileRoute } from '@tanstack/react-router';

import { RepoProjectsPage } from '@/pages/repo-projects-page';

export const Route = createFileRoute('/_layout/_protected/repo/$id/projects')({
  component: RepoProjectsPage,
});
