import type { HTMLAttributes } from 'react';

import clsx from 'clsx';

import classes from './validation-text.module.css';

export type ValidationStatus = 'valid' | 'invalid';

interface ValidationProps extends HTMLAttributes<HTMLParagraphElement> {
  status: ValidationStatus;
  text?: string;
}

export const ValidationText = ({ text, status, ...rest }: ValidationProps) => {
  return (
    <p className={clsx(classes['validation-text'], classes[status])} {...rest}>
      {text}
    </p>
  );
};
