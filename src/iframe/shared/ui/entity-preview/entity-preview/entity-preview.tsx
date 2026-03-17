import type {
  Comment,
  CommentAuthorAssociation,
  IssueComment,
  Maybe,
} from '@octokit/graphql-schema';
import type { ReactNode } from 'react';

import { useRef, useState } from 'react';
import { Button, Text, Timeline } from '@primer/react';
import clsx from 'clsx';

import { fetchMoreEntityComments } from '@/shared/api/graphql/queries/entity-comments/gql-entity-comments-query';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { useInView } from '@/shared/lib/hooks/use-in-view';

import { EntityBodyCard } from '../entity-body-card';
import { EntityPreviewHeader } from '../entity-preview-header';
import { EntityPreviewTitle, type EntityPreviewTitleProps } from '../entity-preview-title';
import classes from './entity-preview.module.css';

type CommentsPageInfo = {
  hasNextPage: boolean;
  endCursor: string;
  totalCount?: number;
};

type EntityPreviewProps = {
  topMetadata?: ReactNode;
  bottomMetadata?: ReactNode;
  headerActions?: ReactNode;
  status?: ReactNode;
  title: string;
  link?: string;
  number?: string | number;
  bodyHTML?: string;
  author?: Maybe<{ login?: string | null; avatarUrl?: string }>;
  authorAssociation?: CommentAuthorAssociation;
  createdAt?: string;
  comments?: (Comment | IssueComment | null)[] | null;
  commentsPageInfo?: CommentsPageInfo;
  entityId?: string;
  entity: EntityPreviewTitleProps['variant'];
};

export const EntityPreview = ({
  topMetadata,
  bottomMetadata,
  headerActions,
  title,
  link,
  status,
  bodyHTML = '',
  entity,
  comments,
  commentsPageInfo,
  entityId,
  number,
  author,
  authorAssociation,
  createdAt,
}: EntityPreviewProps) => {
  const { t } = useTranslation();
  const { githubAccessToken } = useAppContext();
  const previewTopRef = useRef<HTMLDivElement>(null);

  const [extraComments, setExtraComments] = useState<(IssueComment | null)[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(commentsPageInfo?.endCursor);
  const [hasMore, setHasMore] = useState(commentsPageInfo?.hasNextPage ?? false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (!entityId || !nextCursor || !githubAccessToken) {
      return;
    }
    setIsLoadingMore(true);

    try {
      const page = await fetchMoreEntityComments({
        entityId,
        after: nextCursor,
        token: githubAccessToken,
      });
      if (page) {
        setExtraComments((prev) => [...prev, ...(page.nodes as IssueComment[])]);
        setNextCursor(page.pageInfo.endCursor ?? undefined);
        setHasMore(page.pageInfo.hasNextPage);
      }
    } finally {
      setIsLoadingMore(false);
    }
  };

  const allComments = [...(comments ?? []), ...extraComments];

  const isPreviewTopInView = useInView(previewTopRef, {
    threshold: 0,
  });

  return (
    <div className={classes.preview}>
      <div ref={previewTopRef} className={classes['preview-top']}>
        <EntityPreviewHeader
          title={<EntityPreviewTitle title={title} link={link} variant={entity} number={number} />}
          bottomInfo={status}
          topActions={headerActions}
        />
        {topMetadata && <div className={clsx(classes['preview-top-metadata'])}>{topMetadata}</div>}
      </div>

      <div
        className={clsx(
          classes['preview-sticky'],
          !isPreviewTopInView && classes['preview-top-hidden']
        )}
      >
        {status && <div className={classes.status}>{status}</div>}
        <EntityPreviewTitle
          className={classes['entity-preview-title']}
          withIcon={false}
          title={title}
          link={link}
          variant={entity}
          size="medium"
          truncate
          number={number}
        />
      </div>

      <div className={classes.timeline}>
        <EntityBodyCard
          html={bodyHTML}
          authorName={author?.login ?? undefined}
          avatarSrc={author?.avatarUrl}
          createdAt={createdAt}
          authorAssociation={authorAssociation}
        />
        {allComments.length > 0 && (
          <Timeline>
            {allComments.map((comment) => (
              <>
                <Timeline.Item />
                <EntityBodyCard
                  authorName={comment?.author?.login}
                  avatarSrc={comment?.author?.avatarUrl}
                  html={comment?.bodyHTML}
                  createdAt={comment?.createdAt}
                  authorAssociation={comment?.authorAssociation}
                />
              </>
            ))}
          </Timeline>
        )}
      </div>
      {hasMore && entityId && (
        <Button variant="invisible" onClick={handleLoadMore} disabled={isLoadingMore} block={true}>
          {isLoadingMore
            ? t('entity.shared.entityPreview.comments.loading')
            : t('entity.shared.entityPreview.comments.loadMore')}
        </Button>
      )}
      {bottomMetadata && (
        <div className={classes['preview-content']}>
          <Text as="h3" size="medium">
            {t('entity.shared.entityPreview.metadataSection.title')}
          </Text>
          {bottomMetadata}
        </div>
      )}
    </div>
  );
};
