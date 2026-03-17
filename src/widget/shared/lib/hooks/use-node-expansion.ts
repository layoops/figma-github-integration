import { useWidgetNodeId } from '../../../widget-components';

type UseNodeToggleMoreParams = {
  setIsToggled: (newValue: boolean | ((curr: boolean) => boolean)) => void;
};

export const useNodeToggleMore = ({ setIsToggled }: UseNodeToggleMoreParams) => {
  const widgetNodeId = useWidgetNodeId();

  const toggleMore = async () => {
    const widgetNode = (await figma.getNodeByIdAsync(widgetNodeId)) as WidgetNode;
    widgetNode.parent.appendChild(widgetNode);

    setIsToggled((prev) => !prev);
  };

  return { toggleMore };
};
