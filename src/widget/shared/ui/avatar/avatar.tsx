import type { CommonSizes } from '../../styles';

import { AutoLayout, Image } from '../../../widget-components';
import { ColorStyles } from '../../styles';
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
          stroke={ColorStyles.border}
          name="Avatar Image"
          cornerRadius={100}
          width={20}
          height={20}
          src={avatarUrl}
        />
      )}
      {text && (
        <CustomText href={href} size={size} hidden={textIsHidden} fontWeight={600}>
          {text}
        </CustomText>
      )}
    </AutoLayout>
  );
};
