import { AutoLayout } from '../../../widget-components';
import { IconButton } from '../buttons';

export type EntityHeaderProps = {
  title: FigmaDeclarativeNode;
  openedMore?: boolean;
  contentPreview?: FigmaDeclarativeNode;
  disabled?: boolean;
  onOpenMoreButtonClick: () => void;
} & AutoLayoutProps;

export const EntityHeader = ({
  title,
  openedMore,
  onOpenMoreButtonClick,
  contentPreview,
  disabled = false,
  ...rest
}: EntityHeaderProps) => {
  return (
    <AutoLayout
      direction="vertical"
      verticalAlignItems="center"
      spacing={8}
      padding={{ horizontal: 16, vertical: 16 }}
      width="fill-parent"
      {...rest}
    >
      <AutoLayout direction="horizontal" spacing={8} width="fill-parent" verticalAlignItems="start">
        {title}
        <IconButton
          onClick={onOpenMoreButtonClick}
          icon="chevron"
          appearance="ghost"
          size="extra-small"
          iconRotation={openedMore ? 180 : 0}
          state={disabled ? 'disabled' : openedMore ? 'selected' : 'default'}
        />
      </AutoLayout>
      {contentPreview}
    </AutoLayout>
  );
};
