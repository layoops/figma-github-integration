import { BaseStyles } from '@primer/react';
import { Outlet } from '@tanstack/react-router';

import { AppThemeProvider } from './app-theme-provider';

export const Providers = () => {
  return (
    <AppThemeProvider>
      <BaseStyles>
        <Outlet />
      </BaseStyles>
    </AppThemeProvider>
  );
};
