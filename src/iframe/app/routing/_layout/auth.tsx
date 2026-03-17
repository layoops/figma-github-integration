import { createFileRoute, redirect } from '@tanstack/react-router';

import { AuthPage } from '@/pages/auth-page';

export const Route = createFileRoute('/_layout/auth')({
  component: AuthPage,
  beforeLoad: async ({ context }) => {
    if (context.auth.token) {
      throw redirect({ to: '/', replace: true });
    }
  },
});
