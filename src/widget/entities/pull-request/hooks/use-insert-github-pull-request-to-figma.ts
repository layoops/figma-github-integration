import type { PullRequest } from '@octokit/graphql-schema';

import {
  buildEntityWidgetSyncState,
  notifyInsertToFigmaSuccess,
} from '../../../shared/lib/helpers';
import { useWidgetTranslation } from '../../../shared/lib/hooks';
import { SYNC_KEYS } from '../../../shared/lib/sync-keys';
import { calculateWidgetOffset } from '../../../shared/lib/utils';
import { useWidgetNodeId } from '../../../widget-components';

const buildGithubPullRequestWidgetSyncState = (data: PullRequest) =>
  buildEntityWidgetSyncState({ data: data, widgetType: 'pullRequest' });

type InsertGithubIssueToFigmaParams = {
  settings: {
    fallbackArrayIndex: number;
  };
};

export const useInsertGithubPullRequestToFigma = ({ settings }: InsertGithubIssueToFigmaParams) => {
  const widgetNodeId = useWidgetNodeId();
  const { t } = useWidgetTranslation();

  const insertGithubPullRequestWidget = async ({
    data,
    parentPosition,
  }: {
    data: PullRequest;
    parentPosition?: { x: number; y: number };
  }) => {
    const findOrCreateWidgetNode = async (): Promise<WidgetNode | null> => {
      function isValidWidgetNode(widgetNode: WidgetNode | null): widgetNode is WidgetNode {
        return widgetNode !== null && widgetNode !== undefined;
      }

      const widgetNode = (await figma.getNodeByIdAsync(widgetNodeId)) as WidgetNode;

      if (!isValidWidgetNode(widgetNode)) {
        console.error('Widget node not found.');
        return null;
      }

      return widgetNode;
    };
    const widgetNode = await findOrCreateWidgetNode();

    try {
      const id = data.id;
      const widgetId = widgetNode?.widgetId;
      const allWidgetNodes = figma.currentPage.findAll(
        (node) => node.type === 'WIDGET'
      ) as WidgetNode[];

      const myWidgetNodes = allWidgetNodes.filter((node) => node?.widgetId === widgetId);

      const preExistingGithubPullRequestWidget =
        id &&
        myWidgetNodes?.find(
          (node) => node?.widgetSyncedState?.[SYNC_KEYS.entity.pullRequest.content]?.id === id
        );

      if (preExistingGithubPullRequestWidget) {
        const { pullRequestTabs: _, ...rest } =
          preExistingGithubPullRequestWidget.widgetSyncedState;
        preExistingGithubPullRequestWidget.setWidgetSyncedState({
          ...rest,
          [SYNC_KEYS.entity.pullRequest.content]: data,
          [SYNC_KEYS.widget.lastSyncDate]: new Date().toISOString(),
        });
      }

      if (preExistingGithubPullRequestWidget) {
        notifyInsertToFigmaSuccess(t('success.pullRequestResynced', { title: data.title }));
        figma.viewport.scrollAndZoomIntoView([preExistingGithubPullRequestWidget]);
        figma.closePlugin();

        return;
      }

      if (typeof data !== 'object' || data === null) {
        console.error('Invalid data type for githubIssue');
        return;
      }

      let clonedNode: WidgetNode | null = null;

      if (widgetNode) {
        clonedNode = widgetNode.cloneWidget(buildGithubPullRequestWidgetSyncState(data));
      }

      if (!clonedNode && allWidgetNodes.length > settings.fallbackArrayIndex) {
        clonedNode = allWidgetNodes[allWidgetNodes.length - 1].cloneWidget(
          buildGithubPullRequestWidgetSyncState(data)
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

      notifyInsertToFigmaSuccess(t('success.pullRequestImported', { title: data.title }));
    } catch (error) {
      console.error(`Error in insertGithubPullRequestWidget`, error);
    }
  };

  return insertGithubPullRequestWidget;
};
