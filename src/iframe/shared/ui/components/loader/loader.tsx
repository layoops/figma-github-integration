import type { CommonStyleSizes } from '../../../lib/types/style-types';

import { clsx } from 'clsx';

import classes from './loader.module.css';

interface LoaderIconProps {
  size: CommonStyleSizes;
  theme: 'dark' | 'light';
}

interface LoaderProps extends LoaderIconProps {
  textVariant?: 'primary' | 'secondary' | 'none';
}

export const LoaderIcon = ({ size, theme }: LoaderIconProps) => {
  return (
    <div
      className={clsx(
        classes['loader'],
        classes[`loader-theme-${theme}`],
        classes[`loader-size-${size}`]
      )}
    />
  );
};

export const Loader = ({
  textVariant = 'primary',
  size = 'medium',
  theme = 'dark',
}: LoaderProps) => {
  return (
    <div className={classes['loader-wrapper']}>
      <LoaderIcon size={size} theme={theme} />
      {textVariant !== 'none' && (
        <span>{textVariant === 'primary' ? 'Loading' : 'One moment please...'}</span>
      )}
    </div>
  );
};
