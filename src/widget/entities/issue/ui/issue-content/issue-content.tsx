import type { EntityTabConfig } from '../../../../shared/ui/entity-tabs';
import type { DraftIssue, Issue } from '@octokit/graphql-schema';

import { formatDate } from '../../../../shared/lib/helpers';
import { useWidgetTranslation } from '../../../../shared/lib/hooks';
import { SYNC_KEYS } from '../../../../shared/lib/sync-keys';
import { palette } from '../../../../shared/styles';
import {
  EntityCommentsSection,
  EntityContentLayout,
  EntityHTMLBodySection,
  EntityRelativesSection,
} from '../../../../shared/ui';
import { EntityMetadataSection } from '../../../../shared/ui/entities-sections/entity-metadata-section';
import { EntityTabs } from '../../../../shared/ui/entity-tabs';
import { IconExternal } from '../../../../shared/ui/icons';
import { AutoLayout, useSyncedState } from '../../../../widget-components';

type IssueFieldsProps = {
  entity: Issue | DraftIssue;
} & AutoLayoutProps;

type IssueTab = 'overview' | 'body' | 'comments' | 'relatives';

const ISSUE_TABS = [
  { key: 'overview', labelKey: 'tabs.overview' },
  {
    key: 'comments',
    labelKey: 'tabs.comments',
  },
] satisfies readonly EntityTabConfig<IssueTab>[];

export const IssueContent = ({ entity, ...rest }: IssueFieldsProps) => {
  const { locale } = useWidgetTranslation();
  const [selectedTab, setSelectedTab] = useSyncedState<IssueTab>(
    SYNC_KEYS.entity.issue.selectedContentTab,
    'overview'
  );

  return (
    <EntityContentLayout {...rest}>
      <EntityTabs
        tabs={ISSUE_TABS}
        selectedTab={selectedTab}
        onChange={(tab) => setSelectedTab(tab)}
        padding={{ horizontal: 12 }}
      />

      <AutoLayout padding={12} spacing={12} direction="vertical" width="fill-parent">
        <EntityHTMLBodySection
          id={entity.id}
          type="description"
          hidden={selectedTab !== 'overview'}
          body={entity.bodyText}
          header={{
            left: {
              title: entity.__typename === 'Issue' ? entity.author.login : undefined,
              avatarUrl: entity.__typename === 'Issue' ? entity.author.avatarUrl : undefined,
            },
            right: {
              text: formatDate({ value: entity.updatedAt, locale }),
              icon: {
                url: entity.__typename === 'Issue' ? entity.url : null,
                src: IconExternal(palette.black),
              },
            },
          }}
        />
        <EntityMetadataSection hidden={selectedTab !== 'overview'} entity={entity}>
          {entity.__typename === 'Issue' && (
            <EntityRelativesSection
              content={{
                timelineItems: entity?.timelineItems?.nodes,
                projectItems: entity?.projectItems?.nodes,
                milestone: entity?.milestone,
              }}
            />
          )}
        </EntityMetadataSection>
        {entity.__typename === 'Issue' && (
          <EntityCommentsSection
            hidden={selectedTab !== 'comments'}
            comments={entity?.comments?.nodes}
            hasNextPage={entity?.comments?.pageInfo?.hasNextPage}
            entityId={entity.id}
            entityType="issue"
          />
        )}
      </AutoLayout>
    </EntityContentLayout>
  );
};
