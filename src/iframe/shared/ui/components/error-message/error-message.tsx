import { forwardRef, type HTMLAttributes } from 'react';
import clsx from 'clsx';

import { IconAlert } from '../../icons';
import classes from './error-message.module.css';

interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  error?: Error;
  errorIconPosition?: 'top' | 'bottom';
  errorIconSize?: 'small' | 'medium' | 'large' | 'very-large';
  direction?: 'vertical' | 'horizontal';
  status?: 'warning' | 'error';
}

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>((props, ref) => {
  const {
    error,
    children,
    direction = 'horizontal',
    errorIconSize = 'medium',
    errorIconPosition = 'top',
    status = 'error',
    ...rest
  } = props;

  const shouldDisplayError = (
    <div
      ref={ref}
      className={clsx(
        classes['error-message'],
        classes[`error-message-status-${status}`],
        classes[`error-message-direction-${direction}`],
        {
          [classes[`error-message-icon-position-${errorIconPosition}`]]: direction === 'vertical',
        }
      )}
      {...rest}
    >
      <div className={classes['error-message-icon']}>
        <IconAlert
          className={classes[`error-message-icon-size-${errorIconSize}`]}
          size="medium"
          fill="transparent"
          stroke="currentColor"
        />
      </div>
      <div>{children ? children : error?.message}</div>
    </div>
  );

  return shouldDisplayError;
});
