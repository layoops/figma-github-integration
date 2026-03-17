import type { CommonSizes } from '../../../../styles/common';
import type { WidgetTheme } from '../../../../styles/themes';
import type { ButtonAppearance, ButtonState } from '../../types';

import { AutoLayout, SVG } from '../../../../../widget-components';
import { getAppropriateTextColor } from '../../../../lib/color-utils';
import {
  borderRadius,
  getColorStyles,
  iconStyles,
  palette,
  spacingStyles,
  TextStyles,
} from '../../../../styles';
import { commonSizings } from '../../../../styles/common';
import { CustomText } from '../../../custom-text';
import { getButtonStyles } from '../../styles/button-styles';

const buttonFontSize: Record<CommonSizes, number> = {
  'extra-small': TextStyles['extra-small'].size,
  small: TextStyles.small.size,
  medium: TextStyles.medium.size,
  large: TextStyles.medium.size,
};

export type ButtonProps = {
  onClick?: () => void;
  text?: string;
  appearance: ButtonAppearance;
  state?: ButtonState;
  size?: CommonSizes;
  href?: string;
  iconLeft?: {
    rotation?: number;
    src: string;
  };
  leftChildren?: FigmaDeclarativeNode;
  iconRight?: {
    rotation?: number;
    src: string;
  };
  color?: string;
  textColor?: string;
  textAlign?: TextProps['horizontalAlignText'];
  widgetTheme?: WidgetTheme;
} & AutoLayoutProps &
  Pick<TextProps, 'fontWeight'>;

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
    fill,
    textAlign = 'center',
    widgetTheme = 'light',
    ...rest
  } = props;

  const colorStyles = getColorStyles(widgetTheme);
  const buttonStyles = getButtonStyles(widgetTheme);

  const defaultTextColor = buttonStyles[appearance].default.text ?? colorStyles.fg.default;

  const backgroundColor = fill ?? buttonStyles[appearance][state]?.bg;

  let textColor = defaultTextColor;

  if (typeof backgroundColor === 'string') {
    textColor = getAppropriateTextColor({
      hexBackgroundColor: backgroundColor,
      lightTextColor: palette.white,
      darkTextColor: palette.gray[900],
    });
  } else {
    const defaultButtonBg = buttonStyles[appearance][state]?.bg;
    if (defaultButtonBg) {
      textColor = getAppropriateTextColor({
        hexBackgroundColor: defaultButtonBg,
        lightTextColor: palette.white,
        darkTextColor: palette.gray[900],
      });
    } else {
      textColor = colorStyles.fg.default;
    }
  }

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
      fill={backgroundColor}
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
        horizontalAlignText={textAlign}
        verticalAlignText="center"
        fill={textColor}
        width="fill-parent"
        height="fill-parent"
      >
        {text}
      </CustomText>
      {iconRight?.src && (
        <SVG
          height={iconStyles.sizing[size]}
          width={iconStyles.sizing[size]}
          rotation={iconRight.rotation}
          src={iconRight.src}
          fill={textColor}
        />
      )}
    </AutoLayout>
  );
};
