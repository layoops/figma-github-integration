import { createFileRoute, redirect } from '@tanstack/react-router';

import { ProtectedLayout } from '@/widgets/protected-layout';

export const Route = createFileRoute('/_layout/_protected')({
  component: ProtectedLayout,
  beforeLoad: async ({ context }) => {
    if (!context.auth.token) {
      throw redirect({ to: '/auth' });
    }
  },
});
