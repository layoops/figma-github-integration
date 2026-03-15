import type { WidgetEntityType } from './types';

type EntitySyncKeys = {
  isOpenMore: string;
  selectedContentTab: string;
  content: string;
  linkedProjectNodeId?: string;
  linkedEntityNodeIds?: string;
};

type EntitySyncKeysRecord = {
  [K in WidgetEntityType]: EntitySyncKeys;
};

export const SYNC_KEYS = {
  widget: {
    type: 'widget.type',
    lastSyncDate: 'widget.lastSyncDate',
    settings: {
      locale: {
        locale: 'shared.state.locale',
        widgetLocaleIsInitialized: (nodeId: string) =>
          `shared.state.locale.initialized.node-${nodeId}`,
      },
    },
  },
  entity: {
    issue: {
      isOpenMore: 'entity.issue.isMoreOpen',
      selectedContentTab: 'entity.issue.selectedContentTab',
      content: 'entity.issue.content',
      linkedProjectNodeId: 'entity.linkedProjectNodeId',
    },
    project: {
      isOpenMore: 'entity.project.isMoreOpen',
      selectedContentTab: 'entity.project.selectedContentTab',
      content: 'entity.project.entityContent',
      linkedEntityNodeIds: 'entity.project.linkedEntityNodeIds',
    },
    pullRequest: {
      isOpenMore: 'entity.pullRequests.isMoreOpen',
      selectedContentTab: 'entity.pullRequests.selectedContentTab',
      content: 'entity.pullRequest.entityContent',
      linkedProjectNodeId: 'entity.linkedProjectNodeId',
    },
  } as const satisfies EntitySyncKeysRecord,
  shared: {
    ui: {
      modal: {
        isOpened: 'shared.ui.modal.isOpened',
      },
      entityHTMLBodySection: {
        maxHeight: (type: string, key: string | number) =>
          `shared.ui.entityHTMLBodySection.maxHeight.type-${type}.key-${key}`,
        expanded: (type: string, key: string | number) =>
          `shared.ui.entityHTMLBodySection.expanded.type-${type}.key-${key}`,
      },
    },
  },
};
