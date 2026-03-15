import { AutoLayout } from '../../../widget-components';

export type BulletListLayoutProps = AutoLayoutProps;

export const BulletListLayout = ({ children, ...rest }: BulletListLayoutProps) => {
  return (
    <AutoLayout direction="vertical" spacing={6} {...rest}>
      {children}
    </AutoLayout>
  );
};
