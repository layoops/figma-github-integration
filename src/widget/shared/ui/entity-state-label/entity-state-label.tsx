import type { IssueState, PullRequestState } from '@octokit/graphql-schema';

import { AutoLayout, SVG } from '../../../widget-components';
import { iconStyles, palette } from '../../styles';
import { CustomText } from '../custom-text';
import {
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
  IssueClosedIcon,
  IssueDraftIcon,
  IssueOpenedIcon,
} from '../icons';

type StateLabelIconProps = {
  state: IssueState | PullRequestState | 'DRAFT';
  icon: SVGProps;
  text?: string;
} & AutoLayoutProps;

export type EntityStateLabelProps = {
  state: IssueState | PullRequestState | 'DRAFT';
  target: 'issue' | 'pullRequest';
  iconOnly?: boolean;
};

const IssueStateColors = {
  DRAFT: palette.fgColorNeutral,
  OPEN: palette.fgColorOpen,
  CLOSE: palette.fgColorDone,
};

const PullRequestStateColors = {
  DRAFT: palette.fgColorNeutral,
  OPEN: palette.fgColorOpen,
  CLOSE: palette.fgColorDanger,
  MERGED: palette.fgColorDone,
  QUEUED: palette.fgColorAttention,
};

const getGithubIssueState = ({
  state,
  fill,
}: {
  state: IssueState | 'DRAFT';
  fill?: string;
}): { text: string; src: string } => {
  switch (state) {
    case 'OPEN':
      return {
        text: 'Open',
        src: IssueOpenedIcon(fill ?? IssueStateColors.OPEN),
      };
    case 'CLOSED':
      return {
        text: 'Close',
        src: IssueClosedIcon(fill ?? IssueStateColors.CLOSE),
      };
    case 'DRAFT':
      return {
        text: 'Draft',
        src: IssueDraftIcon(fill ?? IssueStateColors.DRAFT),
      };
    default:
      return {
        text: 'Draft',
        src: IssueDraftIcon(fill ?? IssueStateColors.OPEN),
      };
  }
};

const getGithubPullRequestState = ({
  state,
  fill,
}: {
  state: PullRequestState | 'DRAFT';
  fill?: string;
}): { text: string; src: string } => {
  switch (state) {
    case 'OPEN':
      return {
        text: 'Open',
        src: GitPullRequestIcon(fill ?? PullRequestStateColors.OPEN),
      };
    case 'MERGED':
      return {
        text: 'Merged',
        src: GitPullRequestClosedIcon(fill ?? PullRequestStateColors.MERGED),
      };
    case 'CLOSED':
      return {
        text: 'Closed',
        src: GitPullRequestClosedIcon(fill ?? PullRequestStateColors.CLOSE),
      };
    default:
      return {
        text: 'Draft',
        src: GitPullRequestDraftIcon(fill ?? PullRequestStateColors.DRAFT),
      };
  }
};

const StateLabel = ({
  text,
  icon: { src: iconSrc, fill, ...iconRest },
  ...rest
}: StateLabelIconProps) => {
  if (!text) {
    return (
      <SVG
        width={iconStyles.sizing.small}
        height={iconStyles.sizing.small}
        src={iconSrc}
        fill={fill}
        {...iconRest}
      />
    );
  }
  return (
    <AutoLayout
      width="hug-contents"
      padding={{ horizontal: 12, vertical: 4 }}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      cornerRadius={100}
      spacing={4}
      {...rest}
    >
      <SVG
        width={iconStyles.sizing.small}
        height={iconStyles.sizing.small}
        src={iconSrc}
        {...iconRest}
      />
      <CustomText fill={palette.white} size="small">
        {text}
      </CustomText>
    </AutoLayout>
  );
};

export const EntityStateLabel = ({ state, target, iconOnly = true }: EntityStateLabelProps) => {
  if (target === 'issue' && state !== 'MERGED') {
    return (
      <StateLabel
        name="StateLabel"
        fill={IssueStateColors[state]}
        state={state}
        icon={{
          src: getGithubIssueState({
            state: state,
            fill: !iconOnly ? palette.white : undefined,
          }).src,
        }}
        text={!iconOnly ? getGithubIssueState({ state: state }).text : undefined}
      />
    );
  }

  if (target === 'pullRequest') {
    return (
      <StateLabel
        name="StateLabel"
        fill={PullRequestStateColors[state]}
        state={state}
        icon={{
          src: getGithubPullRequestState({
            state: state,
            fill: !iconOnly ? palette.white : undefined,
          }).src,
        }}
        text={!iconOnly ? getGithubPullRequestState({ state: state }).text : undefined}
      />
    );
  }
};
