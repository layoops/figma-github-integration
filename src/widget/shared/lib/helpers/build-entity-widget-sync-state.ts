import type { WidgetEntityType } from '../types';

import { SYNC_KEYS } from '../sync-keys';

export const buildEntityWidgetSyncState = <T>({
  widgetType,
  data,
}: {
  data: T;
  widgetType: WidgetEntityType;
}) => ({
  [SYNC_KEYS.entity[widgetType].content]: data,
  [SYNC_KEYS.widget.lastSyncDate]: new Date().toISOString(),
  [SYNC_KEYS.widget.type]: widgetType,
});
