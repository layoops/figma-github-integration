import type { WidgetTheme } from '../../styles/themes';

import { useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { type CommonSizes } from '../../styles';
import { getColorStyles } from '../../styles';
import { CustomText } from '../custom-text';

export type CustomLinkProps = {
  size?: CommonSizes;
} & TextProps;

export const CustomLink = ({ href = '', children, size = 'small', ...rest }: CustomLinkProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <CustomText
      hoverStyle={{
        fill: colorStyles.fg.accent,
      }}
      fontWeight={600}
      href={href}
      name="issue-title"
      size={size}
      width="fill-parent"
      textDecoration={href ? 'underline' : 'none'}
      {...rest}
    >
      {children}
    </CustomText>
  );
};
