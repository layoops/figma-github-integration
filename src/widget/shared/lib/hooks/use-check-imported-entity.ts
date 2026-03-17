import { waitForTask } from '../../../widget-components';
import { SYNC_KEYS } from '../sync-keys';

export const useCheckImportedEntity = () => {
  const checkIfExistEntityWidget = async ({
    id,
    __typename,
  }: {
    id?: string;
    __typename: 'Issue' | 'DraftIssue' | 'PullRequest' | 'ProjectV2';
  }): Promise<boolean> => {
    try {
      waitForTask(
        (async () => {
          const widgetId = figma.widgetId;

          if (!widgetId || !id) {
            return;
          }

          const myWidgetNodes: WidgetNode[] = figma.currentPage.findWidgetNodesByWidgetId(widgetId);

          let preExistingGithubEntityWidget: WidgetNode | undefined;

          if (__typename === 'ProjectV2') {
            preExistingGithubEntityWidget = myWidgetNodes.find(
              (node) =>
                node?.widgetSyncedState?.[SYNC_KEYS.entity.project.content]?.project?.id === id
            );
          } else if (__typename === 'PullRequest') {
            preExistingGithubEntityWidget = myWidgetNodes.find(
              (node) => node?.widgetSyncedState?.[SYNC_KEYS.entity.pullRequest.content]?.id === id
            );
          } else {
            preExistingGithubEntityWidget = myWidgetNodes.find(
              (node) => node?.widgetSyncedState?.[SYNC_KEYS.entity.issue.content]?.id === id
            );
          }

          if (preExistingGithubEntityWidget) {
            figma.viewport.scrollAndZoomIntoView([preExistingGithubEntityWidget]);
            return true;
          }
        })()
      );

      return false;
    } catch (error) {
      console.error(`Error doing 'checkIfExistEntityWidget'`, error);
    }
  };

  return checkIfExistEntityWidget;
};
