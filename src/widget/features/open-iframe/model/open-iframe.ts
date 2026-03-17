import { openPluginUI } from '../../../shared/lib/helpers';

export const openImportIframe = () => {
  openPluginUI({
    routeName: 'import',
    props: {},
    options: { visible: true },
  });
};
export const openSettingsIframe = () => {
  openPluginUI({
    routeName: 'settings',
    props: {},
    options: { visible: true },
  });
};

export const openCreateIframe = () => {
  openPluginUI({
    routeName: 'create',
    props: {},
    options: { visible: true },
  });
};
