import type { Button } from '../button/button';
import type { HTMLAttributes, ReactElement } from 'react';

import clsx from 'clsx';

import classes from './button-group.module.css';

interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: ReactElement<typeof Button> | Array<ReactElement<typeof Button>>;
}

export const ButtonGroup = ({ className, children, ...rest }: ButtonGroupProps) => {
  return (
    <div className={clsx(classes['button-group'], className)} {...rest}>
      {children}
    </div>
  );
};
