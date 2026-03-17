import { AutoLayout } from '../../../widget-components';

export type IssueContentBlockProps = {
  header?: FigmaDeclarativeNode | FigmaDeclarativeNode[];
} & AutoLayoutProps;

export const IssueContentBlock = ({ children, ...rest }: IssueContentBlockProps) => {
  return (
    <AutoLayout direction="vertical" width="fill-parent" spacing={12} {...rest}>
      {children}
    </AutoLayout>
  );
};
