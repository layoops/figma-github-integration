import type { ProjectWidgetData } from '../../../../global-shared/plugin-messages';

import { buildEntityWidgetSyncState } from '../../../shared/lib/helpers';
import { useWidgetTranslation } from '../../../shared/lib/hooks';
import { SYNC_KEYS } from '../../../shared/lib/sync-keys';
import { findOrCreateWidgetNode, WIDGET_SPACING } from '../../../shared/lib/utils';
import { useWidgetNodeId } from '../../../widget-components';

export type LinkedEntityRef = {
  nodeId: string;
  id: string;
  __typename: 'Issue' | 'DraftIssue' | 'PullRequest';
  title: string;
  type: 'issue' | 'pullRequest';
};

const buildGithubProjectWidgetSyncState = (
  data: { project: ProjectWidgetData },
  linkedEntityRefs: LinkedEntityRef[]
) => ({
  ...buildEntityWidgetSyncState({ data: data, widgetType: 'project' }),
  [SYNC_KEYS.entity.project.linkedEntityNodeIds]: linkedEntityRefs,
});

type InsertGithubProjectToFigmaParams = {
  settings: {
    fallbackArrayIndex: number;
  };
};

export const useInsertGithubProjectToFigma = ({ settings }: InsertGithubProjectToFigmaParams) => {
  const widgetNodeId = useWidgetNodeId();
  const { t } = useWidgetTranslation();

  const insertGithubProjectWidget = async ({ data }: { data: { project: ProjectWidgetData } }) => {
    try {
      const widgetNode = await findOrCreateWidgetNode(widgetNodeId);

      const { project } = data;
      const id = project.id;
      const widgetId = widgetNode?.widgetId;

      const myWidgetNodes = figma.currentPage.findWidgetNodesByWidgetId(widgetId);

      const projectItemIds = new Set(
        project.items?.nodes?.map((n) => n?.content?.id).filter(Boolean) ?? []
      );

      const matchedEntityNodes: Array<{ node: WidgetNode; ref: LinkedEntityRef }> = [];

      for (const entityNode of myWidgetNodes) {
        const widgetType = entityNode.widgetSyncedState?.[SYNC_KEYS.widget.type];

        if (widgetType === 'issue') {
          const content =
            entityNode.widgetSyncedState?.[SYNC_KEYS.entity.issue.content] ??
            entityNode.widgetSyncedState?.githubIssue;
          if (content?.id && projectItemIds.has(content.id)) {
            matchedEntityNodes.push({
              node: entityNode,
              ref: {
                nodeId: entityNode.id,
                id: content.id,
                __typename: 'Issue',
                title: content.title ?? content.id,
                type: 'issue',
              },
            });
          }
        } else if (widgetType === 'pullRequest') {
          const content =
            entityNode.widgetSyncedState?.[SYNC_KEYS.entity.pullRequest.content] ??
            entityNode.widgetSyncedState?.pullRequest;
          if (content?.id && projectItemIds.has(content.id)) {
            matchedEntityNodes.push({
              node: entityNode,
              ref: {
                nodeId: entityNode.id,
                id: content.id,
                __typename: 'PullRequest',
                title: content.title ?? content.id,
                type: 'pullRequest',
              },
            });
          }
        }
      }

      const linkedEntityRefs: LinkedEntityRef[] = matchedEntityNodes.map((m) => m.ref);

      const preExistingGithubWidget =
        id &&
        myWidgetNodes.find(
          (node) => node.widgetSyncedState?.[SYNC_KEYS.entity.project.content]?.project?.id === id
        );

      let projectWidgetNode: WidgetNode | null = null;
      let wasInsertedOrUpdated = false;

      const syncState = buildGithubProjectWidgetSyncState(data, linkedEntityRefs);

      if (preExistingGithubWidget) {
        preExistingGithubWidget.setWidgetSyncedState(syncState);
        projectWidgetNode = preExistingGithubWidget;
        wasInsertedOrUpdated = true;
      } else {
        let newProjectNode: WidgetNode | null = null;

        if (widgetNode) {
          newProjectNode = widgetNode.cloneWidget(syncState);
        }

        if (!newProjectNode && myWidgetNodes.length > settings.fallbackArrayIndex) {
          newProjectNode = myWidgetNodes[myWidgetNodes.length - 1].cloneWidget(syncState);
        }

        if (!newProjectNode) {
          console.error('Unable to clone widget - no base widget available');
          figma.notify(
            'Unable to create project widget. Please ensure at least one widget exists.'
          );
          return;
        }

        if (widgetNode) {
          newProjectNode.x = widgetNode.x + widgetNode.width + WIDGET_SPACING;
        }

        projectWidgetNode = newProjectNode;
        wasInsertedOrUpdated = true;
      }

      if (projectWidgetNode) {
        for (const { node: entityNode } of matchedEntityNodes) {
          entityNode.setWidgetSyncedState({
            ...entityNode.widgetSyncedState,
            [SYNC_KEYS.entity.issue.linkedProjectNodeId]: projectWidgetNode.id,
          });
        }
      }

      if (wasInsertedOrUpdated) {
        figma.notify(t('success.projectImported', { title: data.project.title }));
      }
    } catch (error) {
      console.error(`Error in importGithubProject`, error);
    }
  };

  return insertGithubProjectWidget;
};
