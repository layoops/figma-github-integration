import type { Column } from '@primer/react/experimental';
import type { ReactNode } from 'react';

import { useEffect, useMemo, useRef } from 'react';
import { Checkbox, FormControl, Heading } from '@primer/react';
import { DataTable, Table } from '@primer/react/experimental';

import { CheckboxField } from '../../fields';
import classes from './entity-table.module.css';

type BaseRow = {
  id: string | number;
};

export type EntityTableSelection<T> = {
  selectedIds: Set<string>;
  disabled?: boolean;
  onToggle: (id: string) => void;
  onTogglePage: (checked: boolean) => void;
  ariaLabelGenerator?: (item: T) => string | undefined;
};

type EntityTableProps<T extends BaseRow> = {
  data?: (T | null | undefined)[] | null;
  title: string;
  renderRow: (item: T) => ReactNode;
  mainHeaderContent: ReactNode;
  actions?: ReactNode;
  totalCount?: number;
  pageSize: number;
  currentPageIndex: number;
  onPageChange: (newPageIndex: number) => void;
  selection?: EntityTableSelection<T>;
  idKey?: keyof T;
  isLoading?: boolean;
  paginationVersion?: number;
};

export const EntityTable = <T extends BaseRow>({
  data,
  title,
  renderRow,
  mainHeaderContent,
  actions,
  totalCount,
  pageSize,
  currentPageIndex,
  onPageChange,
  selection,
  idKey = 'id' as keyof T,
  isLoading: isLoading,
  paginationVersion = 0,
}: EntityTableProps<T>) => {
  const normalizedData = useMemo<T[]>(
    () => (data ? data?.filter((i): i is T => i !== null) : []),
    [data]
  );
  const selectAllRef = useRef<HTMLInputElement>(null);

  const currentIds = useMemo(() => data?.map((row) => row && String(row[idKey])), [data, idKey]);

  const allCurrentSelected =
    selection &&
    normalizedData.length > 0 &&
    currentIds?.every((id) => id && selection.selectedIds.has(id));

  const someCurrentSelected =
    selection && currentIds?.some((id) => id && selection.selectedIds.has(id));

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = (someCurrentSelected && !allCurrentSelected) ?? false;
    }
  }, [someCurrentSelected, allCurrentSelected]);

  const columns: Column<T>[] = useMemo(() => {
    const cols: Column<T>[] = [];

    if (selection && !selection.disabled) {
      cols.push({
        id: 'selection',
        header: () => (
          <div className={classes.selectionCell}>
            <FormControl>
              <FormControl.Label visuallyHidden>Select all items on this page</FormControl.Label>
              <Checkbox
                ref={selectAllRef}
                checked={allCurrentSelected ?? false}
                onChange={(e) => selection.onTogglePage(e.target.checked)}
              />
            </FormControl>
          </div>
        ),
        renderCell: (row: T) => {
          const id = String(row[idKey]);
          const label = selection.ariaLabelGenerator
            ? selection.ariaLabelGenerator(row)
            : `Select item ${id}`;

          return (
            <div className={classes.selectionCell}>
              <CheckboxField
                checked={selection.selectedIds.has(id)}
                onChange={() => selection.onToggle(id)}
                label={label}
                labelVisuallyHidden
              />
            </div>
          );
        },
        width: 'growCollapse',
        maxWidth: '41px',
        minWidth: '41px',
      });
    }

    cols.push({
      id: 'main',
      header: () => mainHeaderContent,
      rowHeader: true,
      width: 'growCollapse',
      renderCell: renderRow,
    });

    return cols;
  }, [selection, allCurrentSelected, mainHeaderContent, renderRow, idKey]);

  return (
    <div className={classes['table-container']}>
      <div className={classes['table-header']}>
        <Heading as="h3" variant="small">
          {title}
        </Heading>
        {actions}
      </div>
      <Table.Container>
        {isLoading && (
          <Table.Skeleton
            aria-labelledby="repositories"
            aria-describedby="repositories-subtitle"
            cellPadding="normal"
            columns={columns}
            rows={10}
          />
        )}
        {!isLoading && normalizedData && columns && (
          <DataTable data={normalizedData} columns={columns} cellPadding="normal" />
        )}
        <Table.Pagination
          key={`pagination-${currentPageIndex}-${totalCount}-${paginationVersion}`}
          aria-label={`${title} pagination`}
          pageSize={pageSize}
          totalCount={totalCount ?? 0}
          defaultPageIndex={currentPageIndex}
          onChange={({ pageIndex: newPageIndex }) => onPageChange(newPageIndex)}
        />
      </Table.Container>
    </div>
  );
};
