import type { IconButtonProps } from '@primer/react';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from '@primer/octicons-react';
import { IconButton } from '@primer/react';
import clsx from 'clsx';

import classes from './copy-button.module.css';
type CopyButtonProps = {
  className?: string;
  copyContent: string;
  size?: IconButtonProps['size'];
  ariaLabel: string;
};

export const CopyButton = ({
  className,
  size = 'small',
  ariaLabel,
  copyContent,
}: CopyButtonProps) => {
  const [state, setState] = useState<'idle' | 'success'>('idle');

  const copy = async (content: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(content);
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setState('success');

      setTimeout(() => {
        setState('idle');
      }, 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <IconButton
      className={clsx(classes['copy-button'], state === 'success' && classes.success, className)}
      size={size}
      icon={state === 'idle' ? CopyIcon : CheckIcon}
      variant="invisible"
      onClick={() => copy(copyContent)}
      aria-label={state === 'idle' ? ariaLabel : 'Copied!'}
    />
  );
};
