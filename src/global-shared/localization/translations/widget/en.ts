import type { WidgetLocalizationKeys } from '../../types/widget-localization-keys';

export const widgetEn: WidgetLocalizationKeys = {
  common: {
    description: 'Description',
    import: 'Import',
  },

  ui: {
    lastSynced: 'Last synced',
    syncAction: 'Sync',
    updatedAt: 'Updated At',
    projects: 'Projects',
  },

  widget: {
    importIssue: 'Import Issue/PR/Project',
    createIssue: 'Create Issue',
    moreComments: 'More Comments',
    loadMoreComments: 'Load more comments',
    taskProgress: 'Task progress',
    completedIssues: 'Completed Issues',
  },

  tabs: {
    overview: 'Overview',
    body: 'Body',
    comments: 'Comments',
    relatives: 'Relatives',
  },

  entityMetadata: {
    assignee: { fieldTitle: 'Assignee' },
    labels: { fieldTitle: 'Labels', emptyText: 'No labels' },
    projectField: { fieldTitle: 'Project field: {title}', emptyText: 'No project field' },
    relatives: { fieldTitle: 'Relationship' },
    projects: { fieldTitle: 'Projects', emptyText: 'No projects' },
    milestone: { fieldTitle: 'Milestone', emptyText: 'No milestone' },
    development: { fieldTitle: 'Development', emptyText: 'No linked items' },
    importedEntities: { fieldTitle: 'Imported entities', emptyText: 'No entities' },
    notImportedEntities: { fieldTitle: 'Not imported', emptyText: 'All imported' },
  },

  success: {
    tokenRemoved: 'Successfully Removed Github API Token!',
    tokenAuthorized: 'Successfully authorized Github API Token!',
    settingsSaved: 'Successfully save new settings!',
    issueResynced: 'Issue {title} resynced!',
    pullRequestResynced: 'Pull request {title} resynced!',
    issuesImported: 'Successfully imported {count} issues!',
    issueImported: 'Successfully imported {title} issue!',
    pullRequestImported: 'Successfully imported {title} pull request!',
    projectImported: 'Successfully imported {title} project!',
  },

  notifications: {
    unableToResync: 'Unable to resync at this time, please try again.',
    errorImportingIssues: 'Error importing issues from repository',
  },
};
