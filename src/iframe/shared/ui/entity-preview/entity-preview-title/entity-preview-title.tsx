import type { Icon } from '@primer/octicons-react';

import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  LinkExternalIcon,
  ProjectIcon,
  RepoIcon,
} from '@primer/octicons-react';
import { Link, Text } from '@primer/react';
import clsx from 'clsx';

import { CopyButton } from '../../copy-button';
import classes from './entity-preview-title.module.css';

export type EntityPreviewTitleProps = {
  variant:
    | 'issue-opened'
    | 'issue-closed'
    | 'pull-request-opened'
    | 'pull-request-closed'
    | 'pull-request-merged'
    | 'pull-request-draft'
    | 'repository'
    | 'project';
  title: string;
  link?: string;
  withIcon?: boolean;
  className?: string;
  truncate?: boolean;
  number?: string | number;
  size?: 'large' | 'medium';
};

const Icons: Record<EntityPreviewTitleProps['variant'], Icon> = {
  'issue-opened': IssueOpenedIcon,
  'issue-closed': IssueClosedIcon,
  'pull-request-opened': GitPullRequestIcon,
  'pull-request-closed': GitPullRequestClosedIcon,
  'pull-request-merged': GitMergeIcon,
  'pull-request-draft': GitPullRequestDraftIcon,
  repository: RepoIcon,
  project: ProjectIcon,
};

export const EntityPreviewTitle = ({
  variant,
  title,
  link,
  withIcon = true,
  truncate,
  number,
  size = 'large',
  className,
}: EntityPreviewTitleProps) => {
  const IconComponent = Icons[variant];

  return (
    <div className={clsx(classes['preview-title'], truncate && classes.truncate, className)}>
      <div className={classes['left-part']}>
        {withIcon && <IconComponent size={16} className={classes['preview-title-icon']} />}
        <Text size={size} weight="semibold">
          <Link href={link} target="_blank" className={classes['preview-link']}>
            <span className={classes.title}>{title}</span>
            <LinkExternalIcon size={12} className={classes['external-icon']} />
            {number && (
              <Text size={size} weight="normal" className={clsx('muted-text', classes.number)}>
                #{number}
              </Text>
            )}
          </Link>
        </Text>
      </div>
      {link && (
        <CopyButton
          size="small"
          copyContent={link}
          ariaLabel="Copy link"
          className={classes['copy-button']}
        />
      )}
    </div>
  );
};
