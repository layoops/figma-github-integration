import type { HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import classes from './form.module.css';
interface FormProps extends HTMLAttributes<HTMLFormElement> {
  footer: ReactNode;
  errorMessage?: ReactNode;
}

export const Form = ({ className, children, footer, errorMessage, ...rest }: FormProps) => {
  return (
    <form className={clsx(classes['form'], className)} {...rest}>
      <div className={classes['form-content']}>{children}</div>
      {footer}
      {errorMessage}
    </form>
  );
};
