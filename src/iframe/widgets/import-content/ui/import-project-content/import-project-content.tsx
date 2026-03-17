import type { GithubEntity } from '@/shared/lib/types/github';
import type { HTMLAttributes } from 'react';

import clsx from 'clsx';

import { ImportProjectForm } from '@/features/import';

import classes from './import-project-content.module.css';

interface ImportProjectContentProps extends HTMLAttributes<HTMLElement> {
  githubEntity?: GithubEntity;
}

export const ImportProjectContent = ({
  githubEntity: passedGithubEntity,
  className,
  ...rest
}: ImportProjectContentProps) => {
  return (
    <div className={clsx(classes['import-page-content'], className)} {...rest}>
      <ImportProjectForm passedGithubEntity={passedGithubEntity} />
    </div>
  );
};
