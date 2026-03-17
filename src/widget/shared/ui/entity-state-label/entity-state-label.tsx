import type { WidgetTheme } from '../../styles/themes';
import type { IssueState, PullRequestState } from '@octokit/graphql-schema';

import { AutoLayout, SVG, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles, iconStyles } from '../../styles';
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
  textColor?: string;
} & AutoLayoutProps;

export type EntityStateLabelProps = {
  state: IssueState | PullRequestState | 'DRAFT';
  target: 'issue' | 'pullRequest';
  iconOnly?: boolean;
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
        src: IssueOpenedIcon(fill),
      };
    case 'CLOSED':
      return {
        text: 'Close',
        src: IssueClosedIcon(fill),
      };
    case 'DRAFT':
      return {
        text: 'Draft',
        src: IssueDraftIcon(fill),
      };
    default:
      return {
        text: 'Draft',
        src: IssueDraftIcon(fill),
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
        src: GitPullRequestIcon(fill),
      };
    case 'MERGED':
      return {
        text: 'Merged',
        src: GitPullRequestClosedIcon(fill),
      };
    case 'CLOSED':
      return {
        text: 'Closed',
        src: GitPullRequestClosedIcon(fill),
      };
    default:
      return {
        text: 'Draft',
        src: GitPullRequestDraftIcon(fill),
      };
  }
};

const StateLabel = ({
  text,
  icon: { src: iconSrc, fill, ...iconRest },
  textColor,
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
      <CustomText fill={textColor} size="small">
        {text}
      </CustomText>
    </AutoLayout>
  );
};

export const EntityStateLabel = ({ state, target, iconOnly = true }: EntityStateLabelProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  const issueStateColors = {
    DRAFT: colorStyles.state.draft,
    OPEN: colorStyles.state.open,
    CLOSED: colorStyles.state.closed,
  };

  const pullRequestStateColors = {
    DRAFT: colorStyles.state.draft,
    OPEN: colorStyles.state.open,
    CLOSED: colorStyles.state.closed,
    MERGED: colorStyles.state.merged,
    QUEUED: colorStyles.state.open,
  };

  if (target === 'issue' && state !== 'MERGED') {
    const stateColors = issueStateColors[state] ?? colorStyles.state.draft;
    return (
      <StateLabel
        name="StateLabel"
        fill={stateColors.bg}
        state={state}
        icon={{
          src: getGithubIssueState({
            state: state,
            fill: !iconOnly ? colorStyles.fg.onEmphasis : stateColors.fg,
          }).src,
        }}
        textColor={colorStyles.fg.onEmphasis}
        text={!iconOnly ? getGithubIssueState({ state: state }).text : undefined}
      />
    );
  }

  if (target === 'pullRequest') {
    const stateColors = pullRequestStateColors[state] ?? colorStyles.state.draft;
    return (
      <StateLabel
        name="StateLabel"
        fill={stateColors.bg}
        state={state}
        icon={{
          src: getGithubPullRequestState({
            state: state,
            fill: !iconOnly ? colorStyles.fg.onEmphasis : stateColors.fg,
          }).src,
        }}
        textColor={colorStyles.fg.onEmphasis}
        text={!iconOnly ? getGithubPullRequestState({ state: state }).text : undefined}
      />
    );
  }
};
