import type { EntityTabConfig } from './types';

import { useWidgetTranslation } from '../../lib/hooks';
import { TabGroup } from '../tab-group';

export type EntityTabsProps<T extends string> = {
  tabs: readonly EntityTabConfig<T>[];
  selectedTab: T;
  onChange: (tab: T) => void;
  padding?: { horizontal?: number };
};

export const EntityTabs = <T extends string>({
  tabs,
  selectedTab,
  onChange,
  padding,
}: EntityTabsProps<T>) => {
  const { t } = useWidgetTranslation();

  const availableTabs = tabs.map((tab) => ({
    key: tab.key,
    label: t(tab.labelKey),
  }));

  const selectedLabel = availableTabs.find((t) => t.key === selectedTab)?.label;

  return (
    <TabGroup
      padding={padding}
      tabs={availableTabs.map((t) => t.label)}
      selectedTab={selectedLabel}
      onSelect={(label) => {
        const tab = availableTabs.find((t) => t.label === label);
        if (tab) {
          onChange(tab.key);
        }
      }}
    />
  );
};
