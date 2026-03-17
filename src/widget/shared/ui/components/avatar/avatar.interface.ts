import type { CommonSizes } from '../../../styles';

export interface AvatarProps extends AutoLayoutProps {
  avatarUrl?: string;
  text?: string;
  size?: CommonSizes;
  textIsHidden?: boolean;
  href?: string;
}
