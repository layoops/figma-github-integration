import type { IssueState, PullRequestState } from '@octokit/graphql-schema';

import { StateLabel } from '@primer/react';

import { getGithubEntityStateContent } from '@/shared/lib/helpers/get-github-entity-state-content';

export type EntityStateLabelProps = {
  state: IssueState | PullRequestState | 'DRAFT';
  variant?: 'label' | 'icon';
  target: 'issue' | 'pull-request';
  className?: string;
};

export const EntityStateLabel = ({
  state,
  variant = 'label',
  className,
  target,
}: EntityStateLabelProps) => {
  const issueStatus = getGithubEntityStateContent(state, target);

  if (variant === 'icon') {
    return <issueStatus.Icon fill={issueStatus.iconColor} className={className} />;
  }

  return (
    <StateLabel size="small" status={issueStatus.statusIconName} className={className}>
      {issueStatus.text}
    </StateLabel>
  );
};
