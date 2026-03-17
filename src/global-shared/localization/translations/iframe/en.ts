import type { IframeLocalizationKeys } from '../../types/iframe-localization-keys';

export const iframeEn: IframeLocalizationKeys = {
  links: {
    newIssue: {
      title: 'New issue',
    },
  },

  validation: {
    required: 'This field is required.',
    repoRequiredForSearch: "Search queries must include a 'repo:owner/repo' term.",
    invalidTarget: 'Must be a valid GitHub repository or project URL.',
  },

  common: {
    unselectAll: 'Unselect all',
    saving: 'Saving…',
  },

  header: {
    navigation: {
      backButton: {
        tooltipText: 'Go back',
      },
      forwardButton: {
        tooltipText: 'Go forward',
      },
      refreshButton: {
        tooltipText: 'Refresh page',
      },
    },
    menu: {
      anchorButton: {
        tooltipText: 'Menu',
      },
      items: {
        documentation: {
          title: 'Docs',
        },
        settings: {
          title: 'Settings',
        },
        signOut: {
          title: 'Sign Out',
        },
      },
    },
    signInButton: {
      title: 'Sign in',
    },
  },

  settingsForm: {
    language: {
      label: 'Language',
      values: {
        en: 'English',
        ru: 'Русский',
      },
    },
    theme: {
      label: 'Theme',
      values: {
        auto: 'System',
        dark: 'Dark',
        light: 'Light',
      },
    },
    widgetTheme: {
      label: 'Widget Theme',
      values: {
        light: 'Light',
        dark: 'Dark',
      },
    },
    issue: {
      label: 'Issue content',
      fields: {
        includeComments: 'Comments',
        includeAssignees: 'Assignees',
        includeLabels: 'Labels',
        includeProjects: 'Projects',
        includeMilestone: 'Milestone',
        includeRelationship: 'Relationship',
        includeDevelopment: 'Development',
      },
    },
    pullRequest: {
      label: 'Pull Request content',
      fields: {
        includeComments: 'Comments',
        includeAssignees: 'Assignees',
        includeLabels: 'Labels',
        includeProjects: 'Projects',
        includeMilestone: 'Milestone',
        includeRelationship: 'Relationship',
        includeDevelopment: 'Development',
      },
    },
    project: {
      label: 'Project content',
      fields: {
        customField: 'Custom field',
        customFieldCaption:
          'Name of the GitHub Project field used to display item status (e.g. "Status").',
      },
    },
    defaultTargetUrl: {
      label: 'Default target URL',
      caption: 'Pre-fills the target field when creating a new issue (repository or project URL).',
      placeholder: 'https://github.com/owner/repo',
    },
    submitButton: 'Save Settings',
  },

  issueImportForm: {
    searchField: {
      label: 'Search',
      placeholder: 'https://github.com/username/repo/issues/1',
    },
  },

  issueCreateForm: {
    targetField: {
      label: 'Target',
      caption: 'Where the issue will be created',
      placeholder: 'Repository or project',
    },
    titleField: {
      label: 'Title',
      caption: 'Short issue summary',
      placeholder: 'Enter issue title',
    },
    descriptionField: {
      label: 'Description',
      caption: 'Detailed issue description',
      placeholder: 'Enter issue description',
    },
    labelsField: {
      label: 'Select labels',
      caption: 'Select labels to apply to this issue',
      loading: 'Loading labels…',
      placeholder: 'Select labels',
      filterPlaceholder: 'Filter labels',
      emptyTitle: 'No labels found',
      emptyBody: 'Try a different search term',
      selection: {
        stats_zero: 'None selected',
        stats: '{selectedCount} label selected',
        stats_one: '{selectedCount} label selected',
        stats_few: '{selectedCount} labels selected',
        stats_many: '{selectedCount} labels selected',
        stats_other: '{selectedCount} labels selected',
      },
    },
  },

  issuePage: {
    title: 'Issue',
    actionImport: {
      label: 'Import',
    },
  },

  pullRequestPage: {
    title: 'Pull request',
    actionImport: {
      label: 'Import',
    },
  },

  issueCreatePage: {
    title: 'Create Issue',
    actionCreate: {
      label: 'Create',
    },
    actionImportIssue: {
      label: 'Import issue',
    },
    actionCancel: {
      label: 'Cancel',
    },
  },

  projectPage: {
    title: 'Project',
    footerActions: {
      import: {
        title: 'Import',
      },
      importWithProject: {
        title: 'Also import project',
      },
    },
  },

  repoPages: {
    title: 'Repository',
    navigation: {
      issues: 'Issues',
      pullRequests: 'Pull Requests',
      projects: 'Projects',
    },
  },

  repoIssuesPage: {
    footerActions: {
      import: {
        title: 'Import',
      },
    },
  },

  searchPage: {
    title: 'Search result',
  },

  settingsPage: {
    title: 'Settings',
  },

  documentationPage: {
    title: 'Docs',
    intro: 'Learn how to use the Figma GitHub Integration plugin.',
    sections: {
      gettingStarted: {
        title: 'Getting Started',
        body: 'Sign in using GitHub OAuth (click "Log in with GitHub") or paste a Personal Access Token manually. The token needs repo and read:user scopes. Once authenticated, you can import issues, pull requests, and projects directly into Figma.',
      },
      import: {
        title: 'Importing Issues & Pull Requests',
        body: 'Paste a GitHub issue or pull request URL into the search bar on the home screen and press Enter. To import multiple items, open a repository and use checkboxes to select several at once, then click Import.',
      },
      projects: {
        title: 'Importing Projects',
        body: 'Paste a GitHub Project URL (e.g. https://github.com/orgs/myorg/projects/1) into the search bar. The plugin fetches all items in the project so you can select which ones to place on the canvas.',
      },
      createIssue: {
        title: 'Creating Issues',
        body: 'Use the "New issue" button on the home screen. Choose a target repository or project, fill in a title and optional description, then click Create. The new issue can be automatically imported to Figma.',
      },
      search: {
        title: 'Search',
        body: 'The search bar supports GitHub search syntax. Use qualifiers such as: repo:owner/repo, type:issue, type:pr, state:open, state:closed, sort:created, sort:updated. Example: repo:vercel/next.js state:open type:issue',
      },
      settings: {
        title: 'Settings',
        body: 'Open Settings from the menu (top-right corner). Change the language (English / Russian), choose a theme (System, Light, or Dark), and toggle which fields are included when importing issues and pull requests: comments, assignees, labels, milestone, relationships, and development info.\n\nFor projects, you can set the Custom field — the name of the GitHub Project field used to display item status on the widget (e.g. "Status").',
      },
      widget: {
        title: 'Widget',
        body: 'Each imported item becomes a widget on the Figma canvas. Widgets show four tabs: Overview (title, status, metadata), Body (description), Comments, and Relatives (linked issues or PRs). Use the Sync button to refresh with the latest data from GitHub.',
      },
      keyboardShortcuts: {
        title: 'Keyboard Shortcuts',
        body: 'Cmd+← / Ctrl+← — Go back\nCmd+→ / Ctrl+→ — Go forward\n/ — Focus search',
      },
    },
  },

  authorizationPage: {
    title: 'Authorization',
    alreadyLoggedIn: 'You are already logged in.',
    tokenVerifyError: 'Failed to verify token',
    loginWithGitHub: 'Log in with GitHub',
    connectingToGitHub: 'Connecting to GitHub...',
    waitingForAuthorization: 'Waiting for authorization...',
    cancelAuthorization: 'Cancel',
    form: {
      tokenErrorTitle: 'Token Error',
      addManualToken: 'Add Manual Token',
      showToken: 'Show',
      hideToken: 'Hide',
      generateToken: 'Generate Personal Access Token',
    },
  },

  entity: {
    shared: {
      entityPreview: {
        metadataSection: {
          title: 'Metadata',
        },
        comments: {
          loadMore: 'Load more comments',
          loading: 'Loading...',
        },
      },
    },
    issue: {
      entityPreview: {
        metadataGroup: {
          assignees: {
            title: 'Assignees',
            emptyText: 'No assignees',
          },
          labels: {
            title: 'Labels',
            emptyText: 'No labels',
          },
          projects: {
            title: 'Projects',
            emptyText: 'No projects',
          },
          milestone: {
            title: 'Milestone',
            emptyText: 'No milestone',
          },
          relationship: {
            title: 'Relationship',
            emptyText: 'None yet',
            issueParent: {
              title: 'Issue Parent',
            },
          },
          development: {
            title: 'Development',
            emptyText: 'None yet',
          },
        },
      },
      table: {
        title: 'Issues',
        header: {
          filters: {
            opened: {
              title: 'Opened',
            },
            draft: {
              title: 'Draft',
            },
            closed: {
              title: 'Closed',
            },
          },
        },
        entityRow: {
          openedByText: 'opened by',
          unknownAuthor: 'unknown',
        },
        selection: {
          stats: '{selectedCount} of {totalCount} selected',
          stats_one: '{selectedCount} of {totalCount} selected',
          stats_other: '{selectedCount} of {totalCount} selected',
        },
        emptyState: {
          noOpenItems: 'No open issues',
          noClosedItems: 'No closed issues',
        },
      },
    },
    pullRequest: {
      entityPreview: {
        metadataGroup: {
          assignees: {
            title: 'Assignees',
            emptyText: 'No assignees',
          },
          labels: {
            title: 'Labels',
            emptyText: 'No labels',
          },
          projects: {
            title: 'Projects',
            emptyText: 'No projects',
          },
          milestone: {
            title: 'Milestone',
            emptyText: 'No milestone',
          },
        },
      },
      table: {
        title: 'Pull Request',
        header: {
          filters: {
            opened: {
              title: 'Opened',
            },
            closed: {
              title: 'Closed',
            },
          },
        },
        entityRow: {
          openedByText: 'opened by',
          unknownAuthor: 'unknown',
        },
        selection: {
          stats: '{selectedCount} of {totalCount} selected',
          stats_one: '{selectedCount} of {totalCount} selected',
          stats_other: '{selectedCount} of {totalCount} selected',
        },
        emptyState: {
          noOpenItems: 'No open pull requests',
          noClosedItems: 'No closed pull requests',
        },
      },
    },
    project: {
      table: {
        title: 'Projects',
        header: {
          filters: {
            opened: {
              title: 'Opened',
            },
            closed: {
              title: 'Closed',
            },
          },
        },
        entityRow: {
          updatedText: 'updated',
        },
        emptyState: {
          noOpenItems: 'No open projects',
          noClosedItems: 'No closed projects',
        },
      },
    },
  },

  errors: {
    offline: 'You seem to be offline. Please check your connection.',
    invalidGithubData: 'Invalid provided GitHub data or missing access token',
    missingAccessToken: 'GitHub access token is missing',
    invalidUrl: 'Invalid GitHub URL. Please enter a valid GitHub URL.',
    unableToProcess:
      'Unable to process the provided GitHub data. Please check if the item exists and try again.',
    invalidLink:
      'Please provide a valid link to a GitHub issue, pull request, project or repository',
    repositoryMissingData:
      'Repository data is missing owner or name. Provide a repository URL or owner/name.',
    noIssuesFound: 'No issues or pull requests were found',
    notFound: 'Not found',
    failedToConnect: 'Failed to connect to auth server',
    invalidAuthUrl: 'Invalid auth URL',
    authTimeout: 'Authentication timed out. Please try again.',
    serverUnavailable: 'Server unavailable',
  },

  uiComponents: {
    searchField: {
      tooltipText: 'Search',
    },
    htmlBody: {
      emptyText: 'No description provided',
    },
  },

  ui: {
    accessTokenWithScope: 'Access Token',
  },
};
