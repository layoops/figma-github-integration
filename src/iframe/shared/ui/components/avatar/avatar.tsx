import type { CommonStyleSizes } from '../../../lib/types/style-types';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';

import { clsx } from 'clsx';

import classes from './avatar.module.css';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: CommonStyleSizes;
  image: ImgHTMLAttributes<HTMLImageElement>;
  text?: string;
}

export const Avatar = ({ size = 'small', image, className, text, ...rest }: AvatarProps) => {
  return (
    <div className={clsx(classes.avatar, className)} {...rest}>
      <img
        className={clsx(classes['avatar-image'], classes[`avatar-image-size-${size}`])}
        {...image}
      />
      {text && <span>{text}</span>}
    </div>
  );
};
