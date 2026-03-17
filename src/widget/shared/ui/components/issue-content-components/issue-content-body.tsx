import { AutoLayout } from '../../../../widget-components';
import { Colors } from '../../../styles';

export const IssueContentBody = ({ children, ...rest }: AutoLayoutProps) => {
  return (
    <AutoLayout
      padding={8}
      direction="vertical"
      width="fill-parent"
      fill={Colors.white}
      cornerRadius={8}
      spacing={12}
      {...rest}
    >
      {children}
    </AutoLayout>
  );
};
