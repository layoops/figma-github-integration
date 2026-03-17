import { createFileRoute } from '@tanstack/react-router';

import { IndexPage } from '@/pages/index-page';

export const Route = createFileRoute('/_layout/_protected/')({
  component: IndexPage,
});
