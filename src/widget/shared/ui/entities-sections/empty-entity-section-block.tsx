import type { CustomTextProps } from '../custom-text';

import { AutoLayout } from '../../../widget-components';
import { CustomText } from '../custom-text';

type EmptyEntitySectionBlockProps = {
  children: CustomTextProps['children'];
};

export const EmptyEntitySectionBlock = ({ children }: EmptyEntitySectionBlockProps) => {
  return (
    <AutoLayout>
      <CustomText size="extra-small">{children}</CustomText>
    </AutoLayout>
  );
};
