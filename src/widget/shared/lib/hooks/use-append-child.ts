import { useWidgetNodeId } from '../../../widget-components';

interface useAppendChildProps {
  setOpenedMore: (newValue: boolean | ((currValue: boolean) => boolean)) => void;
}

export const useAppendChild = ({ setOpenedMore }: useAppendChildProps) => {
  const widgetNodeId = useWidgetNodeId();

  const openMore = () => {
    const widgetNode = figma.getNodeById(widgetNodeId) as WidgetNode;
    widgetNode.parent.appendChild(widgetNode);

    setOpenedMore((prev) => !prev);
  };

  return { openMore };
};
