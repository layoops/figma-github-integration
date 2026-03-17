import { type ChangeEvent, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { Banner } from '@primer/react';
import clsx from 'clsx';

import classes from './form.module.css';

type FormMode = 'submit' | 'change';

type FormProps = {
  footer?: ReactNode;
  errorMessage?: ReactNode;
  error?: { title: string; description?: string };
  mode?: FormMode;
  onAction?: (event: FormEvent<HTMLFormElement> | ChangeEvent<HTMLFormElement>) => void;
} & Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'>;

export const Form = ({
  className,
  children,
  footer,
  errorMessage,
  error,
  mode = 'submit',
  onAction,
  ...rest
}: FormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAction?.(event);
  };

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    onAction?.(event);
  };

  return (
    <form
      className={clsx(classes.form, className)}
      onSubmit={mode === 'submit' ? handleSubmit : undefined}
      onChange={mode === 'change' ? handleChange : undefined}
      {...rest}
    >
      {error && (
        <Banner
          layout="compact"
          title={error.title}
          description={error.description}
          variant="critical"
          style={{
            width: '100%',
          }}
        />
      )}
      <div className={classes['form-content']}>{children}</div>
      {footer}
      {errorMessage}
    </form>
  );
};
