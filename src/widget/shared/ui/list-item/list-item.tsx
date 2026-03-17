import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, Rectangle, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles } from '../../styles';
import { CustomText } from '../custom-text/custom-text';

export type ListItemProps = TextProps;

export const ListItem = ({ children }: ListItemProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout spacing={6} verticalAlignItems="center">
      <Rectangle fill={colorStyles.fg.default} cornerRadius={100} width={3} height={3} />
      <CustomText fill={colorStyles.fg.default} italic size="extra-small">
        {children}
      </CustomText>
    </AutoLayout>
  );
};
