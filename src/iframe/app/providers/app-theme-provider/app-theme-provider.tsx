import type { ReactNode } from 'react';

import { BaseStyles, ThemeProvider } from '@primer/react';

import { useAppContext } from '@/shared/lib/contexts';

type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const { applicationSettings } = useAppContext();
  return (
    <ThemeProvider colorMode={applicationSettings?.theme ?? 'auto'}>
      <BaseStyles>{children}</BaseStyles>
    </ThemeProvider>
  );
};
