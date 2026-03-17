import type { ReactNode } from 'react';

import classes from './entity-preview-header.module.css';
type EntityPreviewHeaderProps = {
  title: ReactNode;
  topActions?: ReactNode;
  bottomInfo?: ReactNode;
};

export const EntityPreviewHeader = ({
  title,
  topActions,
  bottomInfo,
}: EntityPreviewHeaderProps) => {
  return (
    <div className={classes['entity-preview-header']}>
      {topActions && <div className={classes.actions}>{topActions}</div>}
      {title}
      {bottomInfo && <div className={classes['bottom-info']}>{bottomInfo}</div>}
    </div>
  );
};
