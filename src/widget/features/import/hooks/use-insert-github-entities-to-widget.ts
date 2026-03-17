import type { DraftIssue, Issue, PullRequest } from '@octokit/graphql-schema';

import { useInsertGithubIssuesToFigma, useInsertGithubIssueToFigma } from '../../../entities/issue';
import { useInsertGithubProjectToFigma } from '../../../entities/project';
import { useInsertGithubPullRequestToFigma } from '../../../entities/pull-request';

const FALLBACK_ARRAY_INDEX = 0;

export const useInsertGithubEntitiesToWidget = () => {
  const insertGithubIssueWidget = useInsertGithubIssueToFigma({
    settings: { fallbackArrayIndex: FALLBACK_ARRAY_INDEX },
  });
  const insertGithubPullRequestWidget = useInsertGithubPullRequestToFigma({
    settings: { fallbackArrayIndex: FALLBACK_ARRAY_INDEX },
  });
  const insertGithubIssuesWidget = useInsertGithubIssuesToFigma({
    settings: { fallbackArrayIndex: FALLBACK_ARRAY_INDEX },
    insertPullRequest: insertGithubPullRequestWidget,
  });
  const insertGithubProjectWidget = useInsertGithubProjectToFigma({
    settings: { fallbackArrayIndex: FALLBACK_ARRAY_INDEX },
  });

  const importGithubEntityByQuery = async ({
    data,
  }: {
    data: Issue | DraftIssue | PullRequest;
  }) => {
    try {
      switch (data.__typename) {
        case 'Issue':
        case 'DraftIssue':
          insertGithubIssueWidget({ data: data });
          break;
        case 'PullRequest':
          insertGithubPullRequestWidget({ data: data });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error in importGithubEntityByQuery`, error);
    }
  };

  return {
    insertGithubIssueWidget,
    insertGithubIssuesWidget,
    importGithubEntityByQuery,
    insertGithubPullRequestWidget,
    insertGithubProjectWidget,
  };
};
