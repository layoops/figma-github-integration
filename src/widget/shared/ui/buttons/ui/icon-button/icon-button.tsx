import type { CommonSizes } from '../../../../styles';
import type { WidgetTheme } from '../../../../styles/themes';
import type { ButtonAppearance, ButtonState } from '../../types';

import { AutoLayout, SVG, Text, useSyncedState } from '../../../../../widget-components';
import { SYNC_KEYS } from '../../../../lib/sync-keys';
import { borderRadius, commonSizings, iconStyles } from '../../../../styles';
import { IconChevronUp, IconReload } from '../../../icons';
import { getButtonStyles } from '../../styles/button-styles';

export type IconButtonProps = {
  icon?: 'reload' | 'chevron';
  iconSrc?: string;
  appearance: ButtonAppearance;
  state?: ButtonState;
  size?: CommonSizes;
  iconRotation?: number;
  href?: string;
} & AutoLayoutProps;

export const IconButton = ({
  onClick,
  size = 'medium',
  appearance = 'secondary',
  state = 'default',
  iconRotation = undefined,
  icon,
  iconSrc,
  name = 'Icon Button',
  href,
  ...rest
}: IconButtonProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const buttonStyles = getButtonStyles(widgetTheme);

  return (
    <AutoLayout
      name={name}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      spacing={commonSizings[size].spacing}
      onClick={state !== 'disabled' && onClick}
      cornerRadius={borderRadius.medium}
      fill={buttonStyles[appearance][state]?.bg}
      hoverStyle={{ fill: buttonStyles[appearance].hover.bg }}
      stroke={buttonStyles[appearance].default.border}
      {...rest}
    >
      <AutoLayout
        verticalAlignItems="center"
        horizontalAlignItems="center"
        height={commonSizings[size].height}
        width={commonSizings[size].height}
      >
        {href && (
          <Text
            opacity={0}
            href={href}
            name="External Link"
            width="fill-parent"
            height="fill-parent"
            verticalAlignText="center"
            horizontalAlignText="center"
            fontSize={16}
            fontWeight={400}
            positioning="absolute"
            x={{ type: 'left-right', leftOffset: 0, rightOffset: 0 }}
            y={{ type: 'top-bottom', topOffset: 0, bottomOffset: 0 }}
          >
            S
          </Text>
        )}
        <SVG
          name="IconButton Icon"
          height={iconStyles.sizing.small}
          width={iconStyles.sizing.small}
          rotation={iconRotation}
          src={
            iconSrc ||
            (icon === 'chevron'
              ? IconChevronUp(buttonStyles[appearance][state]?.text)
              : IconReload(buttonStyles[appearance][state]?.text))
          }
        />
      </AutoLayout>
    </AutoLayout>
  );
};
