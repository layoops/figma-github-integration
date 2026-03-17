import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles } from '../../styles';
import { Tab } from '../tab/tab';

export type TabGroupProps = {
  tabs: string[];
  selectedTab: string;
  onSelect: (newValue: string | ((currValue: string) => string)) => void;
} & AutoLayoutProps;

export const TabGroup = ({ tabs, selectedTab, onSelect, ...rest }: TabGroupProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout
      width="fill-parent"
      fill={colorStyles.surface.background}
      padding={{ top: 8 }}
      spacing={12}
      strokeWidth={1}
      strokeAlign="inside"
      {...rest}
    >
      <AutoLayout
        width="fill-parent"
        height={2}
        fill={colorStyles.border}
        positioning="absolute"
        y={{ type: 'bottom', offset: 0 }}
        x={{ type: 'left-right', leftOffset: 0, rightOffset: 0 }}
      />
      {tabs.map((tab) => (
        <Tab
          key={`tab-group-${tab}`}
          onClick={() => onSelect(tab)}
          state={selectedTab === tab ? 'selected' : 'default'}
          text={tab}
          widgetTheme={widgetTheme}
        />
      ))}
    </AutoLayout>
  );
};
