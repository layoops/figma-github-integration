import { createFileRoute } from '@tanstack/react-router';

import { ResyncPage } from '@/pages/resync-page';

export const Route = createFileRoute('/_layout/_protected/resync')({
  component: ResyncPage,
});
