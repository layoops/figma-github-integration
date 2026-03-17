import type { CommonStyleSizes } from '../../../lib/types/style-types';
import type { InputHTMLAttributes, ReactNode } from 'react';

import { forwardRef } from 'react';
import clsx from 'clsx';

import { Label } from '../label/label';
import { ValidationText } from '../validation';
import classes from './text-input.module.css';

type ValidationStatus = 'valid' | 'invalid';

export interface Validation {
  text?: string;
  status?: ValidationStatus;
}

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'children'> {
  hasIconLeft?: boolean;
  size?: CommonStyleSizes;
  validation?: Validation;
  label: string;
  appearance?: 'default' | 'ghost';
  rightChildren?: ReactNode;
  leftChildren?: ReactNode;
  fullWidth?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    placeholder,
    size = 'medium',
    appearance = 'ghost',
    id,
    validation,
    rightChildren,
    leftChildren,
    label: label,
    fullWidth = false,
    ...rest
  } = props;

  const inputFocus = () => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className={clsx(classes['input-wrapper'], { 'full-width': fullWidth })}>
      <Label size="small" onClick={inputFocus} htmlFor={id} text={label} />
      <div className={clsx(classes['input-with-content'])}>
        {leftChildren}
        <input
          ref={ref}
          className={clsx(
            classes['input'],
            classes[`input-size-${size}`],
            classes[`input-validation-${validation?.status ?? 'default'}`],
            classes[`input-appearance-${appearance}`]
          )}
          id={id ?? label.toLowerCase().replace(/\s+/g, '-')}
          placeholder={placeholder}
          {...rest}
        />
        {rightChildren && <div>{rightChildren}</div>}
      </div>
      {validation?.status && <ValidationText text={validation.text} status={validation?.status} />}
    </div>
  );
});
