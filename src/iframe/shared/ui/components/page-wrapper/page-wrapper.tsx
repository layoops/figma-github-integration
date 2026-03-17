import { type HTMLAttributes } from 'react';

import { useAppContext } from '../../../lib/contexts';
import { Loader } from '..';
import classes from './page-wrapper.module.css';
interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {}

export const PageLayout = ({ children, ...rest }: PageLayoutProps) => {
  const { isLoading } = useAppContext();

  return (
    <div className={classes['page-wrapper']} {...rest}>
      {isLoading ? <Loader theme="dark" size="medium" /> : children}
    </div>
  );
};
