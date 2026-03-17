import { createRoute } from '@tanstack/react-router';

import { baseLayoutRoute } from '@/widgets/layout';

import { SettingsPage } from '../ui';

export const settingsRoute = createRoute({
  getParentRoute: () => baseLayoutRoute,
  path: 'settings',
  component: SettingsPage,
});
