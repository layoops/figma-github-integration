import type { ButtonLinkProps } from './button.interface';

import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

import classes from './button.module.css';

export const ButtonLink = (props: ButtonLinkProps) => {
  const {
    appearance = 'secondary',
    size = 'medium',
    fullWidth = false,
    children,
    isActive = false,
    iconLeft,
    iconRight,
    ...rest
  } = props;
  return (
    <Link
      className={clsx(
        classes.button,
        classes[`button-size-${size}`],
        classes[`button-appearance-${appearance}`],
        { [classes[`button-appearance-${appearance}-selected`]]: isActive },

        { 'full-width': fullWidth }
      )}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Link>
  );
};
