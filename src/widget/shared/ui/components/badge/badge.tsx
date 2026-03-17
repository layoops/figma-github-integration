import type { BadgeProps } from './badge.interface';

import { AutoLayout } from '../../../../widget-components';
import { presetColors, spacingStyles } from '../../../styles';
import { CustomText } from '../custom-text';

export const Badge = ({ text, presetColor, color, ...rest }: BadgeProps) => {
  let badgeColor: string = presetColors.GRAY;

  if (presetColor) {
    badgeColor = presetColors[presetColor];
  }
  if (color) {
    badgeColor = `#${color}`;
  }

  return (
    <AutoLayout
      padding={{ horizontal: spacingStyles.small }}
      horizontalAlignItems={'center'}
      verticalAlignItems="center"
      height={24}
      cornerRadius={100}
      fill={badgeColor}
      {...rest}
    >
      <CustomText fontWeight={600} size="extra-small">
        {text}
      </CustomText>
    </AutoLayout>
  );
};
