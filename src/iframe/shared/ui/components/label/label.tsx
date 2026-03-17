import type { CommonStyleSizes } from '../../../lib/types';
import type { LabelHTMLAttributes } from 'react';

import clsx from 'clsx';

import classes from './label.module.css';

interface LabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {
  size?: CommonStyleSizes;
  text: string;
}

export const Label = ({ text, size = 'medium', ...rest }: LabelProps) => {
  return (
    <label className={clsx(classes['label'], classes[`label-size-${size}`])} {...rest}>
      {text}
    </label>
  );
};
