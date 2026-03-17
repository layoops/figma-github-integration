import type { WidgetTheme } from '../../../shared/styles/themes';
import type { EntityTabConfig } from '../../../shared/ui/entity-tabs';
import type { PullRequest } from '@octokit/graphql-schema';

import { formatDate } from '../../../shared/lib/helpers';
import { useWidgetTranslation } from '../../../shared/lib/hooks';
import { SYNC_KEYS } from '../../../shared/lib/sync-keys';
import { getColorStyles } from '../../../shared/styles';
import {
  EntityCommentsSection,
  EntityContentLayout,
  EntityHTMLBodySection,
  EntityRelativesSection,
} from '../../../shared/ui';
import { EntityMetadataSection } from '../../../shared/ui/entities-sections/entity-metadata-section';
import { EntityTabs } from '../../../shared/ui/entity-tabs';
import { IconExternal } from '../../../shared/ui/icons';
import { AutoLayout, useSyncedState } from '../../../widget-components';

type PullRequestContentProps = {
  pullRequest: PullRequest;
} & AutoLayoutProps;

type PullRequestTab = 'overview' | 'body' | 'comments' | 'relatives';

const PULL_REQUEST_TABS = [
  { key: 'overview', labelKey: 'tabs.overview' },
  {
    key: 'comments',
    labelKey: 'tabs.comments',
  },
] satisfies readonly EntityTabConfig<PullRequestTab>[];

export const PullRequestContent = ({ pullRequest, ...rest }: PullRequestContentProps) => {
  const { t, locale } = useWidgetTranslation();
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  const [selectedTab, setSelectedTab] = useSyncedState<PullRequestTab>(
    SYNC_KEYS.entity.pullRequest.selectedContentTab,
    'overview'
  );

  return (
    <EntityContentLayout {...rest}>
      <EntityTabs
        tabs={PULL_REQUEST_TABS}
        selectedTab={selectedTab}
        onChange={(tab) => setSelectedTab(tab)}
        padding={{ horizontal: 12 }}
      />
      <AutoLayout padding={12} spacing={12} direction="vertical" width="fill-parent">
        <EntityHTMLBodySection
          id={pullRequest.id}
          type="description"
          hidden={selectedTab !== 'overview'}
          body={pullRequest?.bodyText}
          header={{
            left: {
              title: t('common.description'),
            },
            right: {
              text: formatDate({ value: pullRequest?.updatedAt, locale }),
              icon: {
                url: pullRequest.url,
                src: IconExternal(colorStyles.fg.default),
              },
            },
          }}
        />
        <EntityMetadataSection hidden={selectedTab !== 'overview'} entity={pullRequest}>
          <EntityRelativesSection
            content={{
              timelineItems: pullRequest?.timelineItems?.nodes,
              projectItems: pullRequest?.projectItems?.nodes,
              milestone: pullRequest?.milestone,
            }}
          />
        </EntityMetadataSection>
        <EntityCommentsSection
          hidden={selectedTab !== 'comments'}
          comments={pullRequest?.comments?.nodes}
          hasNextPage={pullRequest?.comments?.pageInfo?.hasNextPage}
          entityId={pullRequest.id}
          entityType="pull-request"
        />
      </AutoLayout>
    </EntityContentLayout>
  );
};
