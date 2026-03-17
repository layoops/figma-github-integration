import { createFileRoute } from '@tanstack/react-router';

import { IssueCreatePage } from '@/pages/issue-create-page';

export const Route = createFileRoute('/_layout/_protected/issue/create')({
  validateSearch: (search: Record<string, unknown>) => ({
    target: typeof search.target === 'string' ? search.target : undefined,
  }),
  component: IssueCreatePage,
});
