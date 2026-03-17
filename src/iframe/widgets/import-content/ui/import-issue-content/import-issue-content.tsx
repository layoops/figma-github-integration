import type { HTMLAttributes } from 'react';

import clsx from 'clsx';

import { ImportIssueQuerySearchForm, ImportIssueSearchForm } from '@/features/import';

interface ImportIssueProps extends HTMLAttributes<HTMLElement> {
  searchType: 'search' | 'query-search' | 'project';
}

export const ImportIssueContent = ({ searchType, className, ...rest }: ImportIssueProps) => {
  return (
    <div className={clsx(className)} {...rest}>
      <ImportIssueSearchForm className={clsx({ hidden: searchType !== 'search' })} />
      <ImportIssueQuerySearchForm className={clsx({ hidden: searchType !== 'query-search' })} />
    </div>
  );
};
