import { TableIcon } from '@primer/octicons-react';
import { Blankslate } from '@primer/react/experimental';

import classes from './empty-table-row.module.css';

type EmptyTableRowProps = {
  title: string;
  description?: string;
};

export const EmptyTableRow = ({ title, description }: EmptyTableRowProps) => {
  return (
    <div className={classes['empty-table-row']}>
      <Blankslate>
        <Blankslate.Visual>
          <TableIcon size="medium" />
        </Blankslate.Visual>
        <Blankslate.Heading>{title}</Blankslate.Heading>
        <Blankslate.Description>{description}</Blankslate.Description>
      </Blankslate>
    </div>
  );
};
