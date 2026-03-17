import type { ReactNode } from 'react';

import { Text } from '@primer/react';
import clsx from 'clsx';

import { EntityPreviewGroupTitle } from '../entity-preview-group-title';
import classes from './entity-preview-metadata-group.module.css';

type EntityPreviewMetadataGroupProps = {
  title: string;
  orientation: 'vertical' | 'horizontal';
  state?: 'idle' | 'empty';
  children: ReactNode;
  emptyText?: string;
};

export const EntityPreviewMetadataGroup = ({
  orientation,
  title,
  children,
  state = 'idle',
  emptyText,
}: EntityPreviewMetadataGroupProps) => {
  return (
    <div
      className={clsx(
        classes['entity-preview-metadata-group'],
        orientation === 'horizontal' && classes['horizontal']
      )}
    >
      <EntityPreviewGroupTitle
        size="small"
        weight={orientation === 'horizontal' ? 'normal' : 'semibold'}
      >
        {title}
      </EntityPreviewGroupTitle>
      {state === 'idle' && children}
      {state === 'empty' && (
        <Text size="small" className="muted-text">
          {emptyText}
        </Text>
      )}
    </div>
  );
};
