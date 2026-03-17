import { openSettingsIframe } from '../../../features/open-iframe/model/open-iframe';
import { usePropertyMenu } from '../../../widget-components';
import { IconReload } from '../../ui/icons';

export const useWidgetMenu = () => {
  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      itemType: 'action',
      propertyName: 'settings',
      tooltip: 'Reset',
      icon: `${IconReload('gray')}`,
    },
  ];

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'settings') {
      openSettingsIframe();
    }
  });

  return propertyMenu;
};
