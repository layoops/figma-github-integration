import type { GithubPresetColors } from '../../../lib/types/github';

export interface BadgeProps extends AutoLayoutProps {
  text: string;
  presetColor?: GithubPresetColors;
  color?: string;
}
