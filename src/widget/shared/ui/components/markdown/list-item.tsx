import { AutoLayout, Rectangle } from '../../../../widget-components';
import { Colors } from '../../../styles';
import { CustomText } from '../custom-text/custom-text';

interface ListItemProps extends TextProps {}

export const ListItem = ({ children }: ListItemProps) => {
  return (
    <AutoLayout spacing={6} verticalAlignItems="center">
      <Rectangle fill={Colors.black} cornerRadius={100} width={3} height={3} />
      <CustomText italic size="extra-small">
        {children}
      </CustomText>
    </AutoLayout>
  );
};
