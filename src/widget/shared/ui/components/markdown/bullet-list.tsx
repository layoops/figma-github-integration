import { AutoLayout } from '../../../../widget-components';

interface BulletListProps extends AutoLayoutProps {}

export const BulletList = ({ children, ...rest }: BulletListProps) => {
  return (
    <AutoLayout direction="vertical" spacing={6} {...rest}>
      {children}
    </AutoLayout>
  );
};
