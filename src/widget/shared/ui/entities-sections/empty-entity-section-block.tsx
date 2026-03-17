import type { WidgetTheme } from '../../styles/themes';
import type { CustomTextProps } from '../custom-text';

import { AutoLayout } from '../../../widget-components';
import { getColorStyles } from '../../styles';
import { CustomText } from '../custom-text';

type EmptyEntitySectionBlockProps = {
  children: CustomTextProps['children'];
  widgetTheme?: WidgetTheme;
};

export const EmptyEntitySectionBlock = ({
  children,
  widgetTheme = 'light',
}: EmptyEntitySectionBlockProps) => {
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout>
      <CustomText fill={colorStyles.fg.muted} size="extra-small">
        {children}
      </CustomText>
    </AutoLayout>
  );
};
