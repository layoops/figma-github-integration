import { AutoLayout, Rectangle } from '../../../widget-components';
import { palette } from '../../styles';
import { CustomText } from '../custom-text/custom-text';

export type ListItemProps = TextProps;

export const ListItem = ({ children }: ListItemProps) => {
  return (
    <AutoLayout spacing={6} verticalAlignItems="center">
      <Rectangle fill={palette.black} cornerRadius={100} width={3} height={3} />
      <CustomText italic size="extra-small">
        {children}
      </CustomText>
    </AutoLayout>
  );
};
