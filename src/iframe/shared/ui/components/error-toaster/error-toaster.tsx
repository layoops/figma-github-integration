import type { ReactNode } from 'react';

import { ErrorMessage, PageLayout } from '..';
import classes from './error-toaster.module.css';

export const ErrorToaster = ({
  children,
  text,
  status = 'error',
}: {
  children?: ReactNode;
  text?: string[];
  status: 'warning' | 'error';
}) => {
  return (
    <PageLayout style={{ height: 'fit-content', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <ErrorMessage status={status} errorIconSize="large">
        <div className={classes['error-toaster']}>
          <div className={classes['error-toaster-content']}>
            {text?.map((txt) => <p key={txt}>{txt}</p>)}
            {children}
          </div>
        </div>
      </ErrorMessage>
    </PageLayout>
  );
};
