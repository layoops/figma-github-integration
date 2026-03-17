import { UnderlineNav } from '@primer/react';

import classes from './sticky-underline-nav.module.css';

type StickyUnderlineNavProps = {
  children: React.ReactNode;
};

export const StickyUnderlineNav = ({ children }: StickyUnderlineNavProps) => {
  return <UnderlineNav className={classes['sticky-underline-nav']}>{children}</UnderlineNav>;
};
