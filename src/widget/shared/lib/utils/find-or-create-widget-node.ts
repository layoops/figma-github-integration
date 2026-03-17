import { isValidWidgetNode } from './is-valid-widget-node';

export const findOrCreateWidgetNode = async (widgetNodeId: string): Promise<WidgetNode | null> => {
  let widgetNode = (await figma.getNodeByIdAsync(widgetNodeId)) as WidgetNode;

  if (!isValidWidgetNode(widgetNode)) {
    console.warn('Original widget node not found, looking for existing widgets...');
    const widgetId = figma.widgetId;

    const allWidgetNodes: WidgetNode[] = figma.currentPage.findWidgetNodesByWidgetId(widgetId);

    const existingWidget = allWidgetNodes.find((node) => {
      return (
        node?.widgetId &&
        (node?.widgetSyncedState?.widgetType === 'issue' ||
          node?.widgetSyncedState?.widgetType === 'pull-request' ||
          node?.widgetSyncedState?.widgetType === 'project')
      );
    });

    if (existingWidget) {
      return existingWidget;
    }

    console.error('No widget nodes found. Cannot proceed with import.');
    figma.notify('Unable to import: No base widget found. Please create a new widget instance.');
    return null;
  }

  return widgetNode;
};
