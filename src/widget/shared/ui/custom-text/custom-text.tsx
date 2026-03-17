import type { WidgetTheme } from '../../styles';

import { Text, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { type CommonSizes, getColorStyles, TextStyles } from '../../styles';

export type CustomTextProps = {
  size?: CommonSizes;
} & TextProps;

export const CustomText = ({ children, size, href = '', ...rest }: CustomTextProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <Text
      href={href}
      fill={colorStyles.fg.default}
      width="fill-parent"
      fontSize={size ? TextStyles[size].size : TextStyles.small.size}
      lineHeight={size ? TextStyles[size].lineHeight : TextStyles.small.lineHeight}
      textDecoration={href ? 'underline' : 'none'}
      {...rest}
    >
      {children}
    </Text>
  );
};
