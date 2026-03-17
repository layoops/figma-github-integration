import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, Line, Rectangle } from '../../../widget-components';
import { useModal } from '../../lib/hooks';
import { getColorStyles } from '../../styles';
import { IconButton } from '../buttons';
import { CustomText } from '../custom-text';
import { IconClose } from '../icons';

export type ModalProps = Omit<AutoLayoutProps, 'children'> & {
  widgetTheme?: WidgetTheme;
};

export const Modal = ({ widgetTheme = 'light', ...rest }: ModalProps) => {
  const {
    closeModal,
    modal: {
      openedModal,
      modalContent: { title, children },
    },
  } = useModal();

  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout
      name="Modal"
      width="fill-parent"
      x={{ type: 'left-right', leftOffset: 0, rightOffset: 0 }}
      y={{ type: 'top-bottom', topOffset: 0, bottomOffset: 0 }}
      positioning="absolute"
      height="hug-contents"
      overflow="scroll"
      direction="vertical"
      padding={{ vertical: 12, horizontal: 32 }}
      hidden={!openedModal}
      {...rest}
    >
      <Rectangle
        width="fill-parent"
        height="fill-parent"
        fill={`${colorStyles.fg.default}80`}
        x={{ type: 'left-right', leftOffset: 0, rightOffset: 0 }}
        y={{ type: 'top-bottom', topOffset: 0, bottomOffset: 0 }}
        positioning="absolute"
        onClick={closeModal}
      />
      <AutoLayout
        direction="vertical"
        width="fill-parent"
        spacing="auto"
        fill={colorStyles.surface.background}
        cornerRadius={8}
      >
        <AutoLayout direction="vertical" width="fill-parent" fill={colorStyles.surface.background}>
          <AutoLayout padding={6} verticalAlignItems="center" width="fill-parent" spacing="auto">
            <AutoLayout
              padding={{ vertical: 4, horizontal: 6 }}
              verticalAlignItems="center"
              width="fill-parent"
              spacing="auto"
            >
              <CustomText fill={colorStyles.fg.default}>{title}</CustomText>
            </AutoLayout>
            <IconButton
              onClick={closeModal}
              size="extra-small"
              appearance="ghost"
              iconSrc={IconClose(colorStyles.fg.muted)}
            />
          </AutoLayout>

          <Line stroke={colorStyles.border} strokeWidth={1} length="fill-parent" />
        </AutoLayout>

        <AutoLayout
          padding={12}
          direction="vertical"
          width="fill-parent"
          spacing="auto"
          fill={colorStyles.surface.background}
          overflow="scroll"
        >
          {typeof children === 'string' ? (
            <CustomText fill={colorStyles.fg.default} size="extra-small">
              {children}
            </CustomText>
          ) : (
            children
          )}
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
