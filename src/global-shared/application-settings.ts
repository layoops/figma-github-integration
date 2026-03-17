import type { Locale } from './localization';

export type ContentSettings = {
  includeMilestone: boolean;
  includeLabels: boolean;
  includeComments: boolean;
  includeAssignees: boolean;
  includeProjects: boolean;
  includeRelationship: boolean;
  includeDevelopment: boolean;
};

export type Theme = 'auto' | 'dark' | 'light';

export type WidgetTheme = 'light' | 'dark';

export type ApplicationSettings = {
  theme: Theme;
  widgetTheme: WidgetTheme;
  locale: Locale;
  issue: ContentSettings;
  pullRequest: ContentSettings;
  project: {
    customField: string;
  };
  defaultTargetUrl?: string;
};
