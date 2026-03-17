import type { ButtonProps } from './button.interface';

import React from 'react';
import { clsx } from 'clsx';

import { LoaderIcon } from '../loader';
import classes from './button.module.css';

export const Button = (props: ButtonProps) => {
  const {
    appearance = 'secondary',
    size = 'medium',
    fullWidth = false,
    children,
    isActive = false,
    iconLeft,
    iconRight,
    isLoading = false,
    ...rest
  } = props;

  return (
    <button
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
      {isLoading && (
        <div className={clsx(classes['button-loader'], classes[`button-appearance-${appearance}`])}>
          <LoaderIcon theme="light" size="small" />
        </div>
      )}
      {iconRight}
    </button>
  );
};
