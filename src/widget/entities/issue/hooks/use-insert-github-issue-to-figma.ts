import type { DraftIssue, Issue } from '@octokit/graphql-schema';

import {
  buildEntityWidgetSyncState,
  notifyInsertToFigmaSuccess,
} from '../../../shared/lib/helpers';
import { useWidgetTranslation } from '../../../shared/lib/hooks';
import { SYNC_KEYS } from '../../../shared/lib/sync-keys';
import { calculateWidgetOffset, findOrCreateWidgetNode } from '../../../shared/lib/utils';
import { useWidgetNodeId } from '../../../widget-components';

const buildGithubIssueWidgetState = (data: Issue | DraftIssue) =>
  buildEntityWidgetSyncState({ data: data, widgetType: 'issue' });

type InsertGithubIssueToFigmaParams = {
  settings: {
    fallbackArrayIndex: number;
  };
};

export const useInsertGithubIssueToFigma = ({ settings }: InsertGithubIssueToFigmaParams) => {
  const widgetNodeId = useWidgetNodeId();
  const { t } = useWidgetTranslation();

  const insertGithubIssueWidget = async ({
    data,
    parentPosition,
  }: {
    data: Issue | DraftIssue;
    parentPosition?: { x: number; y: number };
  }) => {
    try {
      const widgetNode = await findOrCreateWidgetNode(widgetNodeId);
      const id = data?.id;

      if (!id) {
        return;
      }

      const widgetId = widgetNode?.widgetId;

      const allWidgetNodes: WidgetNode[] = figma.currentPage.findAll((node) => {
        return node?.type === 'WIDGET';
      }) as WidgetNode[];

      const myWidgetNodes: WidgetNode[] = allWidgetNodes.filter((node) => {
        return node?.widgetId === widgetId;
      });

      const preExistingGithubIssueWidget =
        id &&
        myWidgetNodes?.find(
          (node) => node?.widgetSyncedState?.[SYNC_KEYS.entity.issue.content]?.id === id
        );

      if (preExistingGithubIssueWidget) {
        preExistingGithubIssueWidget.setWidgetSyncedState({
          ...preExistingGithubIssueWidget.widgetSyncedState,
          [SYNC_KEYS.entity.issue.content]: data,
          [SYNC_KEYS.widget.lastSyncDate]: new Date().toISOString(),
        });
      }

      if (preExistingGithubIssueWidget) {
        notifyInsertToFigmaSuccess(t('success.issueResynced', { title: data.title }));
        figma.viewport.scrollAndZoomIntoView([preExistingGithubIssueWidget]);
        return;
      }

      if (typeof data !== 'object' || data === null) {
        console.error('Invalid data type for githubIssue');
        return;
      }

      let clonedNode: WidgetNode | null = null;

      if (widgetNode) {
        clonedNode = widgetNode.cloneWidget(buildGithubIssueWidgetState(data));
      }

      if (!clonedNode && allWidgetNodes.length > settings.fallbackArrayIndex) {
        clonedNode = allWidgetNodes[allWidgetNodes.length - 1].cloneWidget(
          buildGithubIssueWidgetState(data)
        );
      }

      if (!clonedNode) {
        console.error('Unable to clone widget - no base widget available');
        figma.notify('Unable to create widget. Please ensure at least one widget exists.');
        return null;
      }

      const { yOffset, xOffset } = calculateWidgetOffset(
        myWidgetNodes.length
          ? myWidgetNodes[myWidgetNodes.length - 1]
          : allWidgetNodes[allWidgetNodes.length - 1]
      );

      clonedNode.y = yOffset;
      clonedNode.x = parentPosition?.x ?? xOffset;

      notifyInsertToFigmaSuccess(t('success.issueImported', { title: data.title }));
      figma.viewport.scrollAndZoomIntoView([clonedNode]);

      return clonedNode;
    } catch (error) {
      console.error(`Error doing 'createLinkedWidget'`, error);
    }
  };

  return insertGithubIssueWidget;
};
