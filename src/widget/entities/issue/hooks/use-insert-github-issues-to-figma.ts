import type { DraftIssue, Issue, PullRequest } from '@octokit/graphql-schema';

import { useWidgetTranslation } from '../../../shared/lib/hooks';
import { useInsertGithubIssueToFigma } from './use-insert-github-issue-to-figma';

const IMPORT_DELAY_MS = 50;
const MIN_ARRAY_LENGTH = 0;

type InsertGithubIssuesToFigmaParams = {
  settings: {
    fallbackArrayIndex: number;
  };
  insertPullRequest?: (params: { data: PullRequest }) => Promise<unknown>;
};

export const useInsertGithubIssuesToFigma = ({
  settings,
  insertPullRequest,
}: InsertGithubIssuesToFigmaParams) => {
  const insertGithubIssueWidget = useInsertGithubIssueToFigma({ settings });

  const { t } = useWidgetTranslation();

  const insertGithubIssuesWidget = async ({
    data,
    closeAfterImport = true,
  }: {
    data: (Issue | DraftIssue | PullRequest)[];
    closeAfterImport?: boolean;
  }) => {
    try {
      if (!Array.isArray(data) || data.length === MIN_ARRAY_LENGTH) {
        console.warn('No issues to import');
        return;
      }

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item?.id) {
          if (item.__typename === 'PullRequest' && insertPullRequest) {
            await insertPullRequest({ data: item as PullRequest });
          } else {
            await insertGithubIssueWidget({ data: item as Issue | DraftIssue });
          }

          if (i < data.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, IMPORT_DELAY_MS));
          }
        }
      }

      figma.notify(t('success.issuesImported', { count: data.length.toString() }));

      if (closeAfterImport) {
        figma.closePlugin();
      }
    } catch (error) {
      console.error('Error in importGithubIssues:', error);
      figma.notify(t('notifications.errorImportingIssues'));
    }
  };

  return insertGithubIssuesWidget;
};
