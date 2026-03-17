import { Banner } from '@primer/react';
import { Outlet } from '@tanstack/react-router';

import { useSearchForm } from '@/features/search';
import { useAppContext } from '@/shared/lib/contexts';
import { formContext } from '@/shared/lib/tanstack-react-form';

import { Header } from '../header/header';
import classes from './layout.module.css';

export const Layout = () => {
  const searchForm = useSearchForm();
  const { globalError, setGlobalError } = useAppContext();

  return (
    <formContext.Provider value={searchForm}>
      <div className={classes.layout}>
        <Header />
        <main className={classes['layout-content']}>
          {globalError?.title && (
            <Banner
              className={classes['error-banner']}
              title={globalError.title}
              description={globalError.message}
              variant={globalError.variant ? globalError.variant : 'critical'}
              onDismiss={() => setGlobalError(null)}
            />
          )}
          <Outlet />
        </main>
      </div>
    </formContext.Provider>
  );
};
