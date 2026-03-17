import type { CommonStyleSizes } from '../../../lib/types/style-types';
import type { ReactNode } from 'react';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

import { Label } from '../label/label';
import classes from './checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: CommonStyleSizes;
  label: string;
  rightChildren?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, onClick, children, rightChildren, size = 'medium', ...rest }, ref) => {
    const inputFocus = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.focus();
      }
    };

    const idx = id ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div
        onClick={onClick}
        className={clsx(classes['checkbox-wrapper'], classes[`checkbox-size-${size}`])}
      >
        <div className={classes['checkbox-content']}>
          <input ref={ref} id={idx} type="checkbox" name="checkbox" {...rest} />
          <Label size="small" onClick={inputFocus} htmlFor={idx} text={label} />
        </div>
        {rightChildren && <div>{rightChildren}</div>}
      </div>
    );
  }
);
