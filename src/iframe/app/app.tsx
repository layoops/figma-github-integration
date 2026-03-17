'use client';

import { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import '@primer/primitives/dist/css/functional/themes/light.css';
import './styles/app.css';

import { InternationalizationProvider } from '@/shared/lib/contexts';
import { AppContext, useAppContextSetup } from '@/shared/lib/contexts/app-context';
import { queryClient } from '@/shared/lib/react-query';
import { router } from '@/shared/routing';

const InnerApp = () => {
  const appData = useAppContextSetup();

  const routerContext = useMemo(() => {
    return {
      queryClient, // Это стабильно
      auth: {
        token: appData.githubAccessToken,
        settings: appData.applicationSettings,
      },
    };
  }, [appData.githubAccessToken, appData.applicationSettings]);

  return (
    <AppContext.Provider value={appData}>
      <RouterProvider router={router} context={routerContext} />
    </AppContext.Provider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InternationalizationProvider>
        <InnerApp />
      </InternationalizationProvider>
    </QueryClientProvider>
  );
};

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);
