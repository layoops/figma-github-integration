import { createFileRoute } from '@tanstack/react-router';

import { ProjectPage } from '@/pages/project-page';

export const Route = createFileRoute('/_layout/_protected/project/$id')({
  component: ProjectPage,
  loader: async ({ params }) => {
    return { projectId: params.id };
  },
});
