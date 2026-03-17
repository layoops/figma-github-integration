import type { HTMLAttributes } from 'react';

import classes from './tab-group.module.css';

interface TabGroupProps extends HTMLAttributes<HTMLUListElement> {}

export const TabGroup = ({ children, ...rest }: TabGroupProps) => {
  return (
    <ul className={classes['tab-group']} {...rest}>
      {children}
    </ul>
  );
};
