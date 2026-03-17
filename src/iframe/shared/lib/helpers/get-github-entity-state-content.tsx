import type { IssueState, PullRequestState } from '@octokit/graphql-schema';
import type { Icon } from '@primer/octicons-react';
import type { StateLabelProps } from '@primer/react';

import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestIcon,
  IssueClosedIcon,
  IssueDraftIcon,
  IssueOpenedIcon,
} from '@primer/octicons-react';

const StateColors = {
  DRAFT: 'var(--fgColor-draft) !important',
  OPEN: 'var(--fgColor-open) !important',
  DONE: 'var(--fgColor-done) !important',
  CLOSED: 'var(--fgColor-closed) !important',
};

type GetGithubEntityStateContentReturn = {
  text: string;
  statusIconName: StateLabelProps['status'];
  Icon: Icon;
  iconColor: string;
};

export const getGithubEntityStateContent = (
  state: IssueState | PullRequestState | 'DRAFT',
  variant: 'pull-request' | 'issue' = 'issue'
): GetGithubEntityStateContentReturn => {
  if (variant === 'issue') {
    switch (state) {
      case 'OPEN':
        return {
          text: 'Open',
          statusIconName: 'issueOpened',
          Icon: IssueOpenedIcon,
          iconColor: StateColors.OPEN,
        };
      case 'CLOSED':
        return {
          text: 'Close',
          statusIconName: 'issueClosed',
          Icon: IssueClosedIcon,
          iconColor: StateColors.DONE,
        };
      default:
        return {
          text: 'Draft',
          statusIconName: 'issueDraft',
          Icon: IssueDraftIcon,
          iconColor: StateColors.DRAFT,
        };
    }
  } else {
    switch (state) {
      case 'OPEN':
        return {
          text: 'Open',
          statusIconName: 'pullOpened',
          Icon: GitPullRequestIcon,
          iconColor: StateColors.OPEN,
        };
      case 'CLOSED':
        return {
          text: 'Close',
          statusIconName: 'pullClosed',
          Icon: GitPullRequestClosedIcon,
          iconColor: StateColors.CLOSED,
        };
      case 'MERGED':
        return {
          text: 'Merged',
          statusIconName: 'pullMerged',
          Icon: GitMergeIcon,
          iconColor: StateColors.DONE,
        };
      default:
        return {
          text: 'Open',
          statusIconName: 'pullOpened',
          Icon: GitPullRequestIcon,
          iconColor: StateColors.OPEN,
        };
    }
  }
};
