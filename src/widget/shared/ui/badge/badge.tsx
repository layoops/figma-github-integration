import type { GithubPresetColors } from '../../lib/types';

import { AutoLayout } from '../../../widget-components';
import { getAppropriateTextColor } from '../../lib/color-utils';
import { palette, presetColors, spacingStyles } from '../../styles';
import { CustomText } from '../custom-text';

export type BadgeProps = {
  text: string;
  presetColor?: GithubPresetColors;
  color?: string;
} & AutoLayoutProps;

export const Badge = ({ text, presetColor, color, ...rest }: BadgeProps) => {
  let badgeBackgroundColor: string = presetColors.GRAY;

  if (presetColor) {
    badgeBackgroundColor = presetColors[presetColor];
  }
  if (color) {
    badgeBackgroundColor = `#${color}`;
  }
  const textColor = getAppropriateTextColor({
    hexBackgroundColor: badgeBackgroundColor,
    lightTextColor: palette.white,
    darkTextColor: palette.gray[900],
  });

  return (
    <AutoLayout
      padding={{ horizontal: spacingStyles.small }}
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height={24}
      cornerRadius={100}
      fill={badgeBackgroundColor}
      {...rest}
    >
      <CustomText fontWeight={600} size="extra-small" fill={textColor}>
        {text}
      </CustomText>
    </AutoLayout>
  );
};
