import type { ApplicationSettings } from '@/shared/lib/types';
import type { QueryClient } from '@tanstack/react-query';

import { BaseStyles } from '@primer/react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { AppThemeProvider } from '../providers';

type RouterContext = {
  queryClient: QueryClient;
  auth: {
    token?: string;
    settings?: ApplicationSettings;
  };
};

const RootRoute = () => {
  return (
    <AppThemeProvider>
      <BaseStyles>
        <Outlet />
      </BaseStyles>
    </AppThemeProvider>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRoute,
});
