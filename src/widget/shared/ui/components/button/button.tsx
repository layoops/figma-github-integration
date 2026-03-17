import type { CommonSizes } from '../../../styles/common';
import type { ButtonProps } from './button.interface';

import { AutoLayout, SVG } from '../../../../widget-components';
import { borderRadius, Colors, iconStyles, spacingStyles, TextStyles } from '../../../styles';
import { commonSizings } from '../../../styles/common';
import { CustomText } from '../custom-text';
import { buttonStyles } from './button-styles';

const buttonFontSize: Record<CommonSizes, number> = {
  'extra-small': TextStyles['extra-small'].size,
  small: TextStyles.small.size,
  medium: TextStyles.medium.size,
  large: TextStyles.medium.size,
};

export const Button = (props: ButtonProps) => {
  const {
    onClick,
    text,
    width = 'hug-contents',
    fontWeight = 'semi-bold',
    appearance = 'secondary',
    state = 'default',
    size = 'medium',
    href = '',
    padding = {
      horizontal: commonSizings[size].padding.x,
    },
    iconLeft,
    leftChildren,
    iconRight,
    ...rest
  } = props;

  return (
    <AutoLayout
      name="button"
      spacing={spacingStyles.small}
      padding={padding}
      onClick={onClick}
      verticalAlignItems="center"
      height={commonSizings[size].height}
      cornerRadius={borderRadius.medium}
      width={width}
      fill={buttonStyles[appearance][state]?.bg}
      hoverStyle={{ fill: buttonStyles[appearance].hover.bg }}
      stroke={buttonStyles[appearance].default.border}
      {...rest}
    >
      {leftChildren}
      {iconLeft?.src && (
        <SVG
          height={iconStyles.sizing[size]}
          width={iconStyles.sizing[size]}
          rotation={iconLeft.rotation}
          src={iconLeft.src}
        />
      )}
      <CustomText
        href={href}
        textDecoration={href ? 'underline' : 'none'}
        fontWeight={fontWeight}
        fontSize={buttonFontSize[size]}
        horizontalAlignText={'center'}
        verticalAlignText={'center'}
        fill={buttonStyles[appearance].default.text ?? Colors.gray[900]}
        width={'fill-parent'}
        height={'fill-parent'}
      >
        {text}
      </CustomText>
      {iconRight?.src && (
        <SVG
          height={iconStyles.sizing[size]}
          width={iconStyles.sizing[size]}
          rotation={iconRight.rotation}
          src={iconRight.src}
        />
      )}
    </AutoLayout>
  );
};
