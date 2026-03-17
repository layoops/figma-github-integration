import type { ButtonIconProps } from './button.interface';

import { clsx } from 'clsx';

import classes from './button.module.css';

export const ButtonIcon = (props: ButtonIconProps) => {
  const { appearance = 'secondary', size = 'medium', children, isActive = false, ...rest } = props;

  return (
    <button
      className={clsx(
        classes.button,
        classes[`button-icon-size-${size}`],
        classes[`button-appearance-${appearance}`],
        { [classes[`button-appearance-${appearance}-selected`]]: isActive }
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
