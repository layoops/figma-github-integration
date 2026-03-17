import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_protected')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.token) {
      throw redirect({ to: '/auth', replace: true });
    }
  },
});
