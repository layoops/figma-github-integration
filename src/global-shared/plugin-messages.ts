import type { ApplicationSettings } from './application-settings';
import type { Locale } from './localization';
import type { MESSAGE_TYPES } from './message-type';
import type { DraftIssue, Issue, PullRequest } from '@octokit/graphql-schema';

export type ProjectContentCounts = {
  totalContent: number;
  typeCounts: Record<string, number>;
  completedTasks: number;
};

/** Minimal project shape sent to the widget — contains only fields actually used there. */
export type ProjectWidgetData = {
  id: string;
  title: string;
  shortDescription?: string | null;
  readme?: string | null;
  items?: {
    nodes?: Array<{
      type: string;
      content?: {
        id: string;
        title?: string | null;
      } | null;
    } | null> | null;
  } | null;
};

/** Messages sent from the iframe to the widget (via window.parent.postMessage). */
export type IframeToWidgetMessage =
  | { type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUE; data: Issue | DraftIssue }
  | { type: MESSAGE_TYPES.IMPORT_GITHUB_PROJECT_ISSUE; data: Issue | DraftIssue }
  | { type: MESSAGE_TYPES.IMPORT_GITHUB_QUERY_ISSUE; data: Issue | DraftIssue | PullRequest }
  | {
      type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUES;
      data: (Issue | DraftIssue | PullRequest)[];
      closeAfterImport?: boolean;
    }
  | { type: MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST; data: PullRequest }
  | {
      type: MESSAGE_TYPES.IMPORT_GITHUB_PROJECT;
      data: { project: ProjectWidgetData; contentCount?: ProjectContentCounts };
    }
  | { type: MESSAGE_TYPES.SEND_GITHUB_TOKEN; token: string; source?: 'oauth' | 'manual' }
  | { type: MESSAGE_TYPES.REMOVE_GITHUB_TOKEN }
  | { type: MESSAGE_TYPES.SEND_GITHUB_SETTINGS; data: { settings: ApplicationSettings } }
  | { type: MESSAGE_TYPES.SET_LOCALE; data: { locale: Locale } }
  | { type: MESSAGE_TYPES.GET_LOCALE }
  | { type: MESSAGE_TYPES.GET_GITHUB_AUTH_TOKEN }
  | { type: MESSAGE_TYPES.RESYNC_GITHUB_ISSUE_RESPONSE }
  | { type: MESSAGE_TYPES.RESYNC_ERROR }
  | { type: MESSAGE_TYPES.CLOSE_PLUGIN }
  | { type: MESSAGE_TYPES.OPEN_URL; data: { url: string } };

/** Messages sent from the widget to the iframe (via figma.ui.postMessage). */
export type WidgetToIframeMessage =
  | { type: MESSAGE_TYPES.INSERT_TO_FIGMA_STATUS; data: { status: 'idle' | 'loading' | 'done' } }
  | {
      type: MESSAGE_TYPES.GET_GITHUB_AUTH_TOKEN_RESPONSE;
      data: { githubAuthToken: string; settings?: ApplicationSettings; locale?: Locale };
    }
  | { type: MESSAGE_TYPES.GET_LOCALE_RESPONSE; data: { locale: Locale } }
  | {
      type: MESSAGE_TYPES.SET_ROUTE;
      data: {
        route: string;
        props?: unknown;
        githubAuthToken?: string;
        settings?: ApplicationSettings;
        locale?: Locale;
      };
    };
