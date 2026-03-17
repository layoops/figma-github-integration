export function isValidWidgetNode(widgetNode: WidgetNode | null): widgetNode is WidgetNode {
  return widgetNode !== null && widgetNode !== undefined;
}
