export type WidgetLocalizationKeys = {
  common: {
    description: string;
    import: string;
  };

  ui: {
    lastSynced: string;
    syncAction: string;
    updatedAt: string;
    projects: string;
  };

  widget: {
    importIssue: string;
    createIssue: string;
    moreComments: string;
    loadMoreComments: string;
    taskProgress: string;
    completedIssues: string;
  };

  tabs: {
    overview: string;
    body: string;
    comments: string;
    relatives: string;
  };

  entityMetadata: {
    assignee: { fieldTitle: string };
    labels: { fieldTitle: string; emptyText: string };
    projectField: { fieldTitle: string; emptyText: string };
    projects: { fieldTitle: string; emptyText: string };
    relatives: { fieldTitle: string };
    milestone: { fieldTitle: string; emptyText: string };
    development: { fieldTitle: string; emptyText: string };
    importedEntities: { fieldTitle: string; emptyText: string };
    notImportedEntities: { fieldTitle: string; emptyText: string };
  };

  success: {
    tokenRemoved: string;
    tokenAuthorized: string;
    settingsSaved: string;
    issueResynced: string;
    pullRequestResynced: string;
    issuesImported: string;
    issueImported: string;
    pullRequestImported: string;
    projectImported: string;
  };

  notifications: {
    unableToResync: string;
    errorImportingIssues: string;
  };
};

type Paths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends string
          ? K
          : T[K] extends object
            ? `${K}.${Paths<T[K]>}`
            : never
        : never;
    }[keyof T]
  : never;

export type WidgetTranslationKey = Paths<WidgetLocalizationKeys>;
