import type { ReactNode } from 'react';

import classes from './page-content-layout-footer.module.css';

type PageContentLayoutFooterProps = {
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
};

export const PageContentLayoutFooter = ({
  footerLeft,
  footerRight,
}: PageContentLayoutFooterProps) => {
  if (!footerLeft && !footerRight) {
    return null;
  }
  return (
    <footer className={classes['footer']}>
      {footerLeft && <div className={classes['footer-left']}>{footerLeft}</div>}
      {footerRight && <div className={classes['footer-right']}>{footerRight}</div>}
    </footer>
  );
};
