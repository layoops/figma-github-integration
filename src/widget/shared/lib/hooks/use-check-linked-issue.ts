import type { Issue, PullRequest } from '@octokit/graphql-schema';

import { useWidgetNodeId } from '../../../widget-components';

export const useCheckImportedIssue = (variant: 'pull-request' | 'issue') => {
  const widgetNodeId = useWidgetNodeId();

  const checkIfExistIssueWidget = async ({
    data,
  }: {
    data: Issue | PullRequest;
  }): Promise<boolean> => {
    try {
      const widgetNode = figma.getNodeById(widgetNodeId) as WidgetNode;

      const id = data?.id;

      if (!widgetNode || !id) return;

      const widgetId = widgetNode.widgetId;

      const allWidgetNodes: WidgetNode[] = figma.currentPage.findAll((node) => {
        return node?.type === 'WIDGET';
      }) as WidgetNode[];

      const myWidgetNodes: WidgetNode[] = allWidgetNodes.filter((node) => {
        return node?.widgetId === widgetId;
      });

      const preExistingGithubIssueWidget =
        id &&
        myWidgetNodes?.find((node) => {
          return variant === 'pull-request'
            ? node?.widgetSyncedState?.pullRequest?.id === id
            : node?.widgetSyncedState?.githubIssue?.id === id;
        });

      if (preExistingGithubIssueWidget) {
        figma.viewport.scrollAndZoomIntoView([preExistingGithubIssueWidget]);
        figma.closePlugin();
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error doing 'checkIfExistIssueWidget'`, error);
    }
  };

  return {
    checkIfExistIssueWidget,
  };
};
