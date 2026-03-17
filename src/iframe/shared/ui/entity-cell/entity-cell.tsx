import type { Label, Maybe } from '@octokit/graphql-schema';
import type { LinkProps } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { IssueLabelToken, LabelGroup, Link, Text } from '@primer/react';
import { createLink } from '@tanstack/react-router';
import clsx from 'clsx';

import { EntityStateLabel, type EntityStateLabelProps } from '../entity-state-label';
import classes from './entity-cell.module.css';

type EntityCellProps = {
  title?: string;
  labels?: Maybe<Maybe<Label>[]>;
  state?: EntityStateLabelProps['state'];
  target?: 'pull-request' | 'issue';
  leadingIcon?: ReactNode;
  bottomContent?: ReactNode;
  className?: string;
  link?: LinkProps;
};

const CustomLink = createLink(Link);

export const EntityCell = ({
  title,
  labels,
  state,
  target = 'issue',
  bottomContent,
  leadingIcon,
  link,
  className,
}: EntityCellProps) => {
  return (
    <div className={clsx(classes.entityCell, className)}>
      {!leadingIcon && state && (
        <EntityStateLabel
          target={target}
          state={state}
          variant="icon"
          className={classes.statusLabel}
        />
      )}
      {leadingIcon && leadingIcon}
      <div className={classes.rightContent}>
        <div className={classes.topContent}>
          {link?.to ? (
            <CustomLink {...link}>
              <Text as="span" size="small" weight="semibold">
                {title}
              </Text>
            </CustomLink>
          ) : (
            <Text as="strong" size="small" weight="semibold">
              {title}
            </Text>
          )}
          {labels && labels.length > 0 && (
            <LabelGroup className={classes['labels']}>
              {labels.map((label, i) => (
                <IssueLabelToken
                  key={i}
                  size="small"
                  text={label?.name}
                  fillColor={`#${label?.color}`}
                />
              ))}
            </LabelGroup>
          )}
        </div>
        {bottomContent && <div className={classes.bottomContent}>{bottomContent}</div>}
      </div>
    </div>
  );
};
