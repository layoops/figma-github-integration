import type { ReactNode } from 'react';

import { Checkbox, FormControl } from '@primer/react';

type CheckboxFieldProps = {
  checked?: boolean;
  label: ReactNode;
  onChange?: (value: boolean) => void;
  labelVisuallyHidden?: boolean;
  disabled?: boolean;
};

export const CheckboxField = ({
  checked,
  label,
  labelVisuallyHidden,
  disabled,
  onChange,
}: CheckboxFieldProps) => (
  <FormControl disabled={disabled}>
    <Checkbox
      disabled={disabled}
      checked={checked}
      onChange={({ target }) => onChange?.(target.checked)}
    />
    <FormControl.Label visuallyHidden={labelVisuallyHidden}>{label}</FormControl.Label>
  </FormControl>
);
