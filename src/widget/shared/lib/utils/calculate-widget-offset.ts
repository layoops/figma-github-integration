const DEFAULT_Y_OFFSET = 300;
const DEFAULT_X_OFFSET = 500;
export const WIDGET_SPACING = 40;

export const calculateWidgetOffset = (lastWidgetNode: WidgetNode) => {
  let yOffset = 0;
  let xOffset = 0;

  if (lastWidgetNode) {
    yOffset += lastWidgetNode.y + lastWidgetNode.height + WIDGET_SPACING;
    xOffset += lastWidgetNode.x;
  } else {
    yOffset += DEFAULT_Y_OFFSET;
    xOffset += DEFAULT_X_OFFSET;
  }

  return { yOffset, xOffset };
};
