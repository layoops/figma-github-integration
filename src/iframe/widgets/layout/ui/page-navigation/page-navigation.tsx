import type { ReactNode } from 'react';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Tab, TabGroup } from '@/shared/ui/components';
import { IconArrowDown, IconPlus, IconSettings } from '@/shared/ui/icons';

import classes from './page-navigation.module.css';

type NavigationTabs = 'Import' | 'Create' | 'Settings';

const tabs: { link: string; text: NavigationTabs; icon: ReactNode }[] = [
  { link: '/import', text: 'Import', icon: <IconArrowDown /> },
  { link: '/create', text: 'Create', icon: <IconPlus /> },
  { link: '/settings', text: 'Settings', icon: <IconSettings /> },
];

export const PageNavigation = () => {
  const [selectedTab, setSelectedTab] = useState<NavigationTabs>('Settings');

  const location = useLocation();

  useEffect(() => {
    location &&
      setSelectedTab(tabs.find((tab) => tab.link === location.pathname)?.text ?? 'Settings');
  }, [location]);

  return (
    <nav className={classes['page-navigation']}>
      <TabGroup>
        {tabs.map((tab) => (
          <li key={tab.text}>
            <Tab
              key={tab.text}
              icon={tab.icon}
              link={{ to: tab.link, onClick: () => setSelectedTab(tab.text) }}
              state={selectedTab === tab.text ? 'selected' : 'default'}
              text={tab.text}
            />
          </li>
        ))}
      </TabGroup>
      {/* <ButtonIcon appearance="ghost">
        <IconSearch />
      </ButtonIcon>
      TODO: Сделать функцию поиска созданных виджетов, может сделать историю событий (добавление, удаление). Сначала сделать лимит в 20 событий. */}
    </nav>
  );
};
