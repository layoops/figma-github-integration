import type { ReactNode } from 'react';

import { type HTMLAttributes } from 'react';
import { Heading } from '@primer/react';

import { useAppContext } from '../../shared/lib/contexts';
import { Loader } from '../../shared/ui/loader';
import classes from './page-content-layout.module.css';
import { PageContentLayoutFooter } from './page-content-layout-footer';

type PageContentLayoutProps = {
  title?: ReactNode;
  entityTitle?: ReactNode;
  navigation?: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const PageContentLayout = ({
  children,
  title,
  entityTitle,
  navigation,
  footerLeft,
  footerRight,
  ...rest
}: PageContentLayoutProps) => {
  const { isLoading } = useAppContext();

  return (
    <div className={classes['page-layout']} {...rest}>
      <div className={classes['main-content']}>
        {!isLoading && title && (
          <div className={classes['page-heading']}>
            <Heading as="h1" variant="medium">
              {title}
            </Heading>
            {entityTitle}
          </div>
        )}
        {!isLoading && navigation}
        <div className={classes['page-content']}>
          {isLoading ? <Loader size="medium" /> : children}
        </div>
      </div>
      <PageContentLayoutFooter footerRight={footerRight} footerLeft={footerLeft} />
    </div>
  );
};
