import { Spinner } from '@primer/react';

import classes from './loader.module.css';

type LoaderProps = {
  textVariant?: 'primary' | 'secondary' | 'none';
  size?: 'small' | 'medium' | 'large';
};

export const Loader = ({ textVariant = 'none', size = 'medium' }: LoaderProps) => {
  return (
    <div className={classes['loader-wrapper']}>
      <Spinner size={size} />
      {textVariant !== 'none' && (
        <span>{textVariant === 'primary' ? 'Loading' : 'One moment please...'}</span>
      )}
    </div>
  );
};
