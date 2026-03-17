import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import type { LinkProps } from 'react-router-dom';

import { clsx } from 'clsx';

import { Button } from '../button';
import { ButtonLink } from '../button/button-link';
import classes from './tab.module.css';

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  state: 'default' | 'selected';
  button?: ButtonHTMLAttributes<HTMLButtonElement>;
  link?: LinkProps;
  icon?: ReactNode;
}

export const Tab = (props: ButtonProps) => {
  const { text, state, icon, button, link, ...rest } = props;

  return (
    <div className={clsx(classes.tab, classes[`tab-state-${state}`])} {...rest}>
      {button && (
        <Button iconLeft={icon} size="small" appearance="ghost" {...button}>
          {text}
        </Button>
      )}
      {link && (
        <ButtonLink iconLeft={icon} size="small" appearance="ghost" {...link}>
          {text}
        </ButtonLink>
      )}
    </div>
  );
};
