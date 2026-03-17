import type { CommonStyleSizes } from '../../../lib/types/style-types';
import type { TextareaHTMLAttributes } from 'react';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

import { ValidationText } from '../validation';
import classes from './text-area.module.css';

type ValidationStatus = 'valid' | 'invalid';

interface Validation {
  text?: string;
  status?: ValidationStatus;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasIconLeft?: boolean;
  size?: CommonStyleSizes;
  validation?: Validation;
  labelText: string;
  appearance?: 'default' | 'ghost';
  fullWidth?: boolean;
}

export const TextArea = (props: TextAreaProps) => {
  const {
    placeholder,
    size = 'medium',
    appearance = 'ghost',
    id,
    validation,
    labelText,
    fullWidth = false,
    ...rest
  } = props;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textAreaFocus = () => {
    textAreaRef.current?.focus();
  };

  useEffect(() => {
    textAreaFocus();
  }, []);

  return (
    <div
      className={clsx(classes['text-area-wrapper'], {
        'full-width': fullWidth,
      })}
    >
      <label onClick={textAreaFocus} className={classes['label']} htmlFor={id}>
        {labelText}
      </label>
      <textarea
        ref={textAreaRef}
        className={clsx(
          classes['text-area'],
          classes[`text-area-size-${size}`],
          classes[`text-area-validation-${validation?.status ?? 'default'}`],
          classes[`text-area-appearance-${appearance}`]
        )}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
      {validation?.status && <ValidationText text={validation.text} status={validation?.status} />}
    </div>
  );
};
