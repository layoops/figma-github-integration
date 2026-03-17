import type { AvatarProps } from './avatar.interface';

import { AutoLayout, Image } from '../../../../widget-components';
import { ColorStyles, commonSizings } from '../../../styles';
import { CustomText } from '../custom-text/custom-text';

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
      tooltip={text}
      {...rest}
    >
      {avatarUrl && (
        <Image
          stroke={ColorStyles.border}
          name="Avatar Image"
          cornerRadius={100}
          width={commonSizings[size].height}
          height={commonSizings[size].height}
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
