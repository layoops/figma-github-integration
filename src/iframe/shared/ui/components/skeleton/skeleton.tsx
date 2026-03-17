import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

import { clsx } from 'clsx';

import classes from './skeleton.module.css';

export const Skeleton = ({ className, ...rest }: SkeletonProps) => {
  return <div className={clsx(classes.skeleton, className)} {...rest} />;
};
