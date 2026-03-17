import type { TextProps } from '@primer/react';

import { Text } from '@primer/react';
import clsx from 'clsx';

import classes from './entity-preview-group-title.module.css';

type EntityPreviewGroupTitleProps = TextProps;

export const EntityPreviewGroupTitle = ({
  size = 'small',
  className,
  children,
  ...rest
}: EntityPreviewGroupTitleProps) => {
  return (
    <Text size={size} {...rest} className={clsx(classes['entity-preview-group-title'], className)}>
      {children}
    </Text>
  );
};
