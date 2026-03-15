import type { ProjectWidgetData } from '../../../../global-shared/plugin-messages';
import type { GithubEntity } from '../../../shared/lib/types/github';
import type { LinkedEntityRef } from '../hooks/use-insert-github-project-to-figma';

import { routes } from '../../../../global-shared/routes-map';
import { openPluginUI } from '../../../shared/lib/helpers';
import { useOpenEntityPluginUI, useWidgetTranslation } from '../../../shared/lib/hooks';
import { SYNC_KEYS } from '../../../shared/lib/sync-keys';
import {
  Button,
  CustomText,
  EntityContentLayout,
  EntityField,
  EntityHTMLBodySection,
} from '../../../shared/ui';
import { EntityStateLabel } from '../../../shared/ui/entity-state-label';
import { type EntityTabConfig, EntityTabs } from '../../../shared/ui/entity-tabs';
import { IssueContentBlock, IssueContentSection } from '../../../shared/ui/issue-content';
import { AutoLayout, useSyncedState } from '../../../widget-components';

type ContentTypeCounts = {
  [key: string]: number;
};

export type ProjectContentCounts = {
  totalContent: number;
  typeCounts: ContentTypeCounts;
  completedTasks: number;
};

type ProjectContentProps = {
  project: ProjectWidgetData | null;
} & AutoLayoutProps;

type ProjectTab = 'overview' | 'body';

const PROJECT_TABS = [
  { key: 'overview', labelKey: 'tabs.overview' },
  {
    key: 'body',
    labelKey: 'tabs.body',
  },
] satisfies readonly EntityTabConfig<ProjectTab>[];

export const openPluginProjectUI = (props: { githubEntity: GithubEntity }) => {
  openPluginUI({
    routeName: routes.project(props.githubEntity.entity.id),
    props: props ?? {},
    options: { visible: true },
  });
};

export const ProjectContent = ({ project, ...rest }: ProjectContentProps) => {
  const { t } = useWidgetTranslation();

  const [selectedTab, setSelectedTab] = useSyncedState<ProjectTab>(
    SYNC_KEYS.entity.project.selectedContentTab,
    'overview'
  );

  const [linkedEntityRefs] = useSyncedState<LinkedEntityRef[]>(
    SYNC_KEYS.entity.project.linkedEntityNodeIds,
    []
  );

  const openEntityPluginUI = useOpenEntityPluginUI();

  const hasLinkedEntities = linkedEntityRefs.length > 0;

  const importedIds = new Set(linkedEntityRefs.map((ref) => ref.id));
  const allItems = project?.items?.nodes ?? [];
  const unimportedIssueCount = allItems.filter(
    (item) => item?.type === 'ISSUE' && !importedIds.has(item?.content?.id ?? '')
  ).length;
  const unimportedPRCount = allItems.filter(
    (item) => item?.type === 'PULL_REQUEST' && !importedIds.has(item?.content?.id ?? '')
  ).length;
  const hasUnimportedEntities = unimportedIssueCount > 0 || unimportedPRCount > 0;

  return (
    <EntityContentLayout {...rest}>
      <EntityTabs
        tabs={PROJECT_TABS}
        selectedTab={selectedTab}
        onChange={(tab) => setSelectedTab(tab)}
        padding={{ horizontal: 12 }}
      />

      <AutoLayout padding={12} spacing={12} direction="vertical" width="fill-parent">
        {selectedTab === 'overview' && (
          <IssueContentSection direction="vertical">
            <EntityField
              field={{ title: t('entityMetadata.importedEntities.fieldTitle') }}
              emptyText={
                !hasLinkedEntities ? t('entityMetadata.importedEntities.emptyText') : undefined
              }
              right={
                hasLinkedEntities
                  ? {
                      props: { direction: 'vertical' },
                      children: (
                        <IssueContentBlock
                          cornerRadius={0}
                          padding={0}
                          spacing={0}
                          direction="vertical"
                        >
                          {linkedEntityRefs.map((ref) => (
                            <Button
                              key={`project-linked-entity-${ref.nodeId}`}
                              textAlign="left"
                              appearance="ghost"
                              width="fill-parent"
                              horizontalAlignItems="start"
                              minHeight={34}
                              size="extra-small"
                              leftChildren={
                                <EntityStateLabel
                                  target={ref.type === 'pullRequest' ? 'pullRequest' : 'issue'}
                                  iconOnly={true}
                                  state="OPEN"
                                />
                              }
                              onClick={() => {
                                openEntityPluginUI({ id: ref.id, __typename: ref.__typename });
                              }}
                              text={ref.title}
                            />
                          ))}
                        </IssueContentBlock>
                      ),
                    }
                  : undefined
              }
            />
            <EntityField
              field={{ title: t('entityMetadata.notImportedEntities.fieldTitle') }}
              emptyText={
                !hasUnimportedEntities
                  ? t('entityMetadata.notImportedEntities.emptyText')
                  : undefined
              }
              withBorder={false}
              right={
                hasUnimportedEntities
                  ? {
                      children: (
                        <IssueContentBlock
                          cornerRadius={0}
                          padding={0}
                          spacing={8}
                          direction="horizontal"
                        >
                          {unimportedIssueCount > 0 && (
                            <AutoLayout spacing={4} verticalAlignItems="center">
                              <EntityStateLabel target="issue" iconOnly={true} state="OPEN" />
                              <CustomText size="extra-small">
                                {String(unimportedIssueCount)}
                              </CustomText>
                            </AutoLayout>
                          )}
                          {unimportedPRCount > 0 && (
                            <AutoLayout spacing={4} verticalAlignItems="center">
                              <EntityStateLabel target="pullRequest" iconOnly={true} state="OPEN" />
                              <CustomText size="extra-small">
                                {String(unimportedPRCount)}
                              </CustomText>
                            </AutoLayout>
                          )}
                        </IssueContentBlock>
                      ),
                    }
                  : undefined
              }
            />
          </IssueContentSection>
        )}

        {selectedTab === 'body' && project?.readme && (
          <EntityHTMLBodySection
            id={project.id}
            type="description"
            hidden={false}
            body={project.readme}
            header={{
              left: { title: t('common.description') },
            }}
          />
        )}
      </AutoLayout>
    </EntityContentLayout>
  );
};
