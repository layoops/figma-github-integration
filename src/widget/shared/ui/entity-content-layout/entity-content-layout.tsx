import { AutoLayout } from '../../../widget-components';
import { palette } from '../../styles';

export type EntityContentLayoutProps = AutoLayoutProps;

export const EntityContentLayout = ({ children, ...rest }: EntityContentLayoutProps) => {
  return (
    <AutoLayout width="fill-parent" fill={palette.white} direction="vertical" {...rest}>
      {children}
    </AutoLayout>
  );
};
