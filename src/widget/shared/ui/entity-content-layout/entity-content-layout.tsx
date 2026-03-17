import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles } from '../../styles';

export type EntityContentLayoutProps = AutoLayoutProps;

export const EntityContentLayout = ({ children, ...rest }: EntityContentLayoutProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout
      width="fill-parent"
      fill={colorStyles.surface.background}
      direction="vertical"
      {...rest}
    >
      {children}
    </AutoLayout>
  );
};
