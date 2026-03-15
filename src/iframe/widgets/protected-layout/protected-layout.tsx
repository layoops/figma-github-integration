import { Outlet } from '@tanstack/react-router';

import { useAppContext } from '@/shared/lib/contexts';

export const ProtectedLayout = () => {
  const { githubAccessToken } = useAppContext();

  if (!githubAccessToken) {
    // return <Navigate to={ROUTES_MAP[ROUTES.AUTH]} replace />;
  }

  return <Outlet />;
};
