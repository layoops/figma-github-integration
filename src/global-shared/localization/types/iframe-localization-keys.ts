export type IframeLocalizationKeys = {
  links: {
    newIssue: {
      title: string;
    };
  };

  validation: {
    required: string;
    repoRequiredForSearch: string;
  };

  common: {
    unselectAll: string;
    saving: string;
  };

  header: {
    navigation: {
      backButton: {
        tooltipText: string;
      };
    };
    menu: {
      anchorButton: {
        tooltipText: string;
      };
      items: {
        documentation: {
          title: string;
        };
        settings: {
          title: string;
        };
        signOut: {
          title: string;
        };
      };
    };
    signInButton: {
      title: string;
    };
  };

  settingsForm: {
    language: {
      label: string;
      values: {
        en: string;
        ru: string;
      };
    };
    theme: {
      label: string;
      values: {
        auto: string;
        light: string;
        dark: string;
      };
    };
    issue: {
      label: string;
      fields: {
        includeComments: string;
        includeAssignees: string;
        includeLabels: string;
        includeProjects: string;
        includeMilestone: string;
        includeRelationship: string;
        includeDevelopment: string;
      };
    };
    pullRequest: {
      label: string;
      fields: {
        includeComments: string;
        includeAssignees: string;
        includeLabels: string;
        includeProjects: string;
        includeMilestone: string;
        includeRelationship: string;
        includeDevelopment: string;
      };
    };
    project: {
      label: string;
      fields: {
        customField: string;
        customFieldCaption: string;
      };
    };
    submitButton: string;
  };

  issueImportForm: {
    searchField: {
      label: string;
      placeholder: string;
    };
  };

  issueCreateForm: {
    targetField: {
      label: string;
      caption: string;
      placeholder: string;
    };
    titleField: {
      label: string;
      caption: string;
      placeholder: string;
    };
    descriptionField: {
      label: string;
      caption: string;
      placeholder: string;
    };
  };

  issuePage: {
    title: string;
    actionImport: {
      label: string;
    };
  };

  pullRequestPage: {
    title: string;
    actionImport: {
      label: string;
    };
  };

  issueCreatePage: {
    title: string;
    actionCreate: {
      label: string;
    };
    actionImportIssue: {
      label: string;
    };
    actionCancel: {
      label: string;
    };
  };

  projectPage: {
    title: string;
    footerActions: {
      import: {
        title: string;
      };
    };
  };

  repoPages: {
    title: string;
    navigation: {
      issues: string;
      pullRequests: string;
      projects: string;
    };
  };

  repoIssuesPage: {
    footerActions: {
      import: {
        title: string;
      };
    };
  };

  searchPage: {
    title: string;
  };

  settingsPage: {
    title: string;
  };

  documentationPage: {
    title: string;
    intro: string;
    sections: {
      gettingStarted: { title: string; body: string };
      import: { title: string; body: string };
      projects: { title: string; body: string };
      createIssue: { title: string; body: string };
      search: { title: string; body: string };
      settings: { title: string; body: string };
      widget: { title: string; body: string };
    };
  };

  authorizationPage: {
    title: string;
    alreadyLoggedIn: string;
    tokenVerifyError: string;
    loginWithGitHub: string;
    connectingToGitHub: string;
    form: {
      tokenErrorTitle: string;
      saveManualToken: string;
      showToken: string;
      hideToken: string;
      generateToken: string;
    };
  };

  entity: {
    shared: {
      entityPreview: {
        metadataSection: {
          title: string;
        };
        comments: {
          loadMore: string;
          loading: string;
        };
      };
    };
    issue: {
      entityPreview: {
        metadataGroup: {
          assignees: {
            title: string;
            emptyText: string;
          };
          labels: {
            title: string;
            emptyText: string;
          };
          projects: {
            title: string;
            emptyText: string;
          };
          milestone: {
            title: string;
            emptyText: string;
          };
          relationship: {
            title: string;
            emptyText: string;
            issueParent: {
              title: string;
            };
          };
          development: {
            title: string;
            emptyText: string;
          };
        };
      };
      table: {
        title: string;
        header: {
          filters: {
            opened: {
              title: string;
            };
            draft: {
              title: string;
            };
            closed: {
              title: string;
            };
          };
        };
        entityRow: {
          openedByText: string;
          unknownAuthor: string;
        };
        selection: {
          stats: string;
          stats_one?: string;
          stats_few?: string;
          stats_many?: string;
          stats_other?: string;
        };
        emptyState: {
          noOpenItems: string;
          noClosedItems: string;
        };
      };
    };
    pullRequest: {
      entityPreview: {
        metadataGroup: {
          assignees: {
            title: string;
            emptyText: string;
          };
          labels: {
            title: string;
            emptyText: string;
          };
          projects: {
            title: string;
            emptyText: string;
          };
          milestone: {
            title: string;
            emptyText: string;
          };
        };
      };
      table: {
        title: string;
        header: {
          filters: {
            opened: {
              title: string;
            };
            closed: {
              title: string;
            };
          };
        };
        entityRow: {
          openedByText: string;
          unknownAuthor: string;
        };
        selection: {
          stats: string;
          stats_one?: string;
          stats_few?: string;
          stats_many?: string;
          stats_other?: string;
        };
        emptyState: {
          noOpenItems: string;
          noClosedItems: string;
        };
      };
    };
    project: {
      table: {
        title: string;
        header: {
          filters: {
            opened: {
              title: string;
            };
            closed: {
              title: string;
            };
          };
        };
        entityRow: {
          updatedText: string;
        };
        emptyState: {
          noOpenItems: string;
          noClosedItems: string;
        };
      };
    };
  };

  errors: {
    offline: string;
    invalidGithubData: string;
    missingAccessToken: string;
    invalidUrl: string;
    unableToProcess: string;
    invalidLink: string;
    repositoryMissingData: string;
    noIssuesFound: string;
    notFound: string;
    failedToConnect: string;
    invalidAuthUrl: string;
    authTimeout: string;
  };

  uiComponents: {
    searchField: {
      tooltipText: string;
    };
    htmlBody: {
      emptyText: string;
    };
  };

  ui: {
    accessTokenWithScope: string;
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

export type IframeTranslationKey = Paths<IframeLocalizationKeys>;
