import { AutoLayout } from '../../../widget-components';
import { CustomText } from '../custom-text';

export type IssueContentSectionProps = {
  headerText?: string;
} & AutoLayoutProps;

export const IssueContentSection = ({
  children,
  headerText,
  ...rest
}: IssueContentSectionProps) => {
  return (
    <AutoLayout direction="vertical" width="fill-parent" spacing={12} {...rest}>
      {headerText && (
        <AutoLayout direction="vertical" width="fill-parent">
          <CustomText fontWeight="semi-bold">{headerText}</CustomText>
        </AutoLayout>
      )}
      {children}
    </AutoLayout>
  );
};
