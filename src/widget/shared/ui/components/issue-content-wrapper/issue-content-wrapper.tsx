import { AutoLayout } from '../../../../widget-components';

interface IssueContentWrapperProps extends AutoLayoutProps {}

export const IssueContentWrapper = ({ children, ...rest }: IssueContentWrapperProps) => {
  return (
    <AutoLayout width={'fill-parent'} fill="#F5F5F5" direction="vertical" {...rest}>
      {children}
    </AutoLayout>
  );
};
