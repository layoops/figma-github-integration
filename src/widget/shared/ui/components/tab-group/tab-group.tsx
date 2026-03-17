import { AutoLayout } from '../../../../widget-components';
import { Colors } from '../../../styles';
import { Tab } from '../tab/tab';

interface TabGroupProps extends AutoLayoutProps {
  tabs: string[];
  selectedTab: string;
  onSelect: (newValue: string | ((currValue: string) => string)) => void;
}

export const TabGroup = ({ tabs, selectedTab, onSelect, ...rest }: TabGroupProps) => {
  return (
    <AutoLayout width="fill-parent" fill={Colors.white} padding={{ top: 8 }} spacing={12} {...rest}>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          onClick={() => onSelect(tab)}
          state={selectedTab === tab ? 'selected' : 'default'}
          text={tab}
        />
      ))}
    </AutoLayout>
  );
};
