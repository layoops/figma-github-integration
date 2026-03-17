import { ROUTES, ROUTES_MAP } from '../../../../global-shared/routes-map';
import { openPluginUI } from '../../../shared/lib/helpers';

export const openPluginIndexPage = () => {
  openPluginUI({
    routeName: ROUTES_MAP[ROUTES.INDEX],
    props: {},
    options: { visible: true },
  });
};

export const openPluginCreateIssuePage = () => {
  openPluginUI({
    routeName: ROUTES_MAP[ROUTES.ISSUE_CREATE],
    props: {},
    options: { visible: true },
  });
};

export const openPluginSettingsPage = () => {
  openPluginUI({
    routeName: ROUTES_MAP[ROUTES.SETTINGS],
    props: {},
    options: { visible: true },
  });
};
