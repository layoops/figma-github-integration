import type { WidgetTheme } from '../../../../styles/themes';
import type { IssueComment } from '@octokit/graphql-schema';

import { AutoLayout, useSyncedState } from '../../../../../widget-components';
import { formatDate } from '../../../../lib/helpers';
import { openPluginUI } from '../../../../lib/helpers/open-plugin-ui';
import { useWidgetTranslation } from '../../../../lib/hooks';
import { SYNC_KEYS } from '../../../../lib/sync-keys';
import { getColorStyles } from '../../../../styles';
import { CustomLink } from '../../../custom-link';
import { IconExternal } from '../../../icons';
import { IssueContentBlock } from '../../../issue-content';
import { EmptyEntitySectionBlock } from '../../empty-entity-section-block';
import { EntityHTMLBodySection } from '../../entity-html-body-section';

export type EntityCommentsSectionProps = {
  comments?: IssueComment[];
  hidden?: boolean;
  hasNextPage?: boolean;
  entityId?: string;
  entityType?: 'issue' | 'pull-request';
} & AutoLayoutProps;

export const EntityCommentsSection = ({
  comments,
  hidden,
  hasNextPage,
  entityId,
  entityType,
  ...rest
}: EntityCommentsSectionProps) => {
  const { t, locale } = useWidgetTranslation();
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  const handleLoadMore = () => {
    if (!entityId || !entityType) {
      return;
    }
    openPluginUI({
      routeName: '/resync',
      props: {
        githubEntity: { entityType, entity: { id: entityId } },
        commentsFirst: (comments?.length ?? 0) + 4,
      },
      options: { visible: false },
    });
  };

  return (
    <AutoLayout hidden={hidden} width="fill-parent" direction="vertical" spacing={12}>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <EntityHTMLBodySection
            id={comment.id}
            type="comment"
            key={`comment-${comment.id}`}
            body={comment?.bodyText}
            header={{
              left: {
                title: comment.author?.login,
                avatarUrl: comment.author?.avatarUrl,
              },
              right: {
                text: formatDate({ value: comment?.updatedAt, locale }),
                icon: {
                  url: comment.url,
                  src: IconExternal(colorStyles.fg.default),
                },
              },
            }}
          />
        ))
      ) : (
        <EmptyEntitySectionBlock widgetTheme={widgetTheme}>No comments</EmptyEntitySectionBlock>
      )}
      {hasNextPage && entityId && comments?.length > 0 && (
        <IssueContentBlock {...rest}>
          <CustomLink fill={colorStyles.fg.accent} onClick={handleLoadMore}>
            {t('widget.loadMoreComments')}
          </CustomLink>
        </IssueContentBlock>
      )}
    </AutoLayout>
  );
};
