import { BaseStyles } from '@primer/react';
import { HotkeysProvider } from '@tanstack/react-hotkeys';
import { Outlet } from '@tanstack/react-router';

import { AppThemeProvider } from './app-theme-provider';

export const Providers = () => {
  return (
    <HotkeysProvider defaultOptions={{ hotkey: { preventDefault: true, ignoreInputs: false } }}>
      <AppThemeProvider>
        <BaseStyles>
          <Outlet />
        </BaseStyles>
      </AppThemeProvider>
    </HotkeysProvider>
  );
};
