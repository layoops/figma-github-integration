import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@/widgets/layout';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});
