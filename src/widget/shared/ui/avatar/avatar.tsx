import type { CommonSizes } from '../../styles';
import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, Image, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles } from '../../styles';
import { CustomText } from '../custom-text';

export type AvatarProps = {
  avatarUrl?: string;
  text?: string;
  size?: CommonSizes;
  textIsHidden?: boolean;
  href?: string;
} & AutoLayoutProps;

export const Avatar = ({
  avatarUrl,
  text,
  size = 'small',
  textIsHidden = false,
  name = 'avatar',
  href = '',
  ...rest
}: AvatarProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout
      name={name}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      spacing={8}
      {...rest}
    >
      {avatarUrl && (
        <Image
          stroke={colorStyles.border}
          name="Avatar Image"
          cornerRadius={100}
          width={20}
          height={20}
          src={avatarUrl}
        />
      )}
      {text && (
        <CustomText
          href={href}
          size={size}
          hidden={textIsHidden}
          fontWeight={600}
          fill={colorStyles.fg.default}
        >
          {text}
        </CustomText>
      )}
    </AutoLayout>
  );
};
