import type { HTMLAttributes } from 'react';

import { useAppContext } from '@/shared/lib/contexts';
import { ErrorToaster } from '@/shared/ui/components';

import { Header } from './header/header';
import classes from './layout.module.css';
interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}

const OFFLINE_TEXT = 'You seem to be offline. Please check your connection.';

export const Layout = ({ children, ...rest }: LayoutProps) => {
  const { isOnline } = useAppContext();
  return (
    <div className={classes['layout']} {...rest}>
      <Header />
      {children}

      {!isOnline && <ErrorToaster text={[OFFLINE_TEXT]} status="warning" />}
    </div>
  );
};
