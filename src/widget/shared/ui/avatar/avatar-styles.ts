import type { CommonSizes } from '../../styles';

import { commonSizings, TextStyles } from '../../styles';

type Sizing = {
  imageSize: number;
  fontSize: number;
};

export const AvatarSize: Record<CommonSizes, Sizing> = {
  'extra-small': {
    imageSize: commonSizings['extra-small'].height,
    fontSize: TextStyles['extra-small'].size,
  },
  small: {
    imageSize: commonSizings['small'].height,
    fontSize: TextStyles.small.size,
  },
  medium: {
    imageSize: commonSizings['medium'].height,
    fontSize: TextStyles.medium.size,
  },
  large: {
    imageSize: commonSizings['large'].height,
    fontSize: TextStyles.medium.size,
  },
};
