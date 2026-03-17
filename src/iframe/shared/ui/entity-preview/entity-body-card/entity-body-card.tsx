import type { CommentAuthorAssociation } from '@octokit/graphql-schema';

import { Avatar, Label, RelativeTime, Text } from '@primer/react';

import { useTranslation } from '../../../lib/contexts/internationalization-context';
import { HTMLBody } from '../../html-body';
import classes from './entity-body-card.module.css';

const ASSOCIATION_LABELS: Partial<Record<CommentAuthorAssociation, string>> = {
  OWNER: 'Owner',
  MEMBER: 'Member',
  COLLABORATOR: 'Collaborator',
  CONTRIBUTOR: 'Contributor',
  FIRST_TIME_CONTRIBUTOR: 'First-time contributor',
};

type EntityBodyCardProps = {
  html: string;
  avatarSrc?: string;
  authorName?: string;
  createdAt?: string;
  authorAssociation?: CommentAuthorAssociation;
};

export const EntityBodyCard = ({
  html,
  avatarSrc = '',
  authorName,
  createdAt,
  authorAssociation,
}: EntityBodyCardProps) => {
  const { locale } = useTranslation();
  const associationLabel = authorAssociation ? ASSOCIATION_LABELS[authorAssociation] : undefined;

  return (
    <div className={classes['entity-body-card']}>
      {(avatarSrc || authorName) && (
        <div className={classes['entity-body-card-header']}>
          <div className={classes['entity-body-card-author']}>
            <Avatar size={24} src={avatarSrc} />
            {authorName && (
              <Text size="small" weight="semibold">
                {authorName}
              </Text>
            )}
            {associationLabel && (
              <Label size="small" variant="secondary">
                {associationLabel}
              </Label>
            )}
          </div>
          {createdAt && (
            <time dateTime={createdAt} title={new Date(createdAt).toLocaleString(locale)}>
              <Text size="small" color="fg.muted">
                <RelativeTime lang={locale} date={new Date(createdAt)} />
              </Text>
            </time>
          )}
        </div>
      )}
      <HTMLBody html={html} />
    </div>
  );
};
