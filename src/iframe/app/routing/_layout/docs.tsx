import { createFileRoute } from '@tanstack/react-router';

import { DocsPage } from '@/pages/docs-page';

export const Route = createFileRoute('/_layout/docs')({
  component: DocsPage,
});
