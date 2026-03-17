import { AutoLayout } from '../../../../widget-components';
import { CustomText } from '../custom-text';

interface IssueFieldProps extends Omit<AutoLayoutProps, 'children'> {
  fieldTitle?: string;
  left?: {
    children?: FigmaDeclarativeNode;
  };
  right?: {
    children?: FigmaDeclarativeNode;
    props?: AutoLayoutProps;
  };
}

export const IssueField = ({
  fieldTitle = 'Field Title',
  left: left,
  right,
  ...rest
}: IssueFieldProps) => {
  return (
    <AutoLayout
      name="Issue Field"
      minHeight={28}
      spacing={8}
      width="fill-parent"
      cornerRadius={6}
      height="hug-contents"
      {...rest}
    >
      {left?.children ?? (
        <AutoLayout padding={{ top: 4 }} minWidth={90}>
          <CustomText size="extra-small" fontWeight={'semi-bold'}>
            {fieldTitle}
          </CustomText>
        </AutoLayout>
      )}
      {right?.children && (
        <AutoLayout
          minHeight={24}
          verticalAlignItems="center"
          width="fill-parent"
          direction="horizontal"
          wrap
          spacing={8}
          {...right.props}
        >
          {right?.children}
        </AutoLayout>
      )}
    </AutoLayout>
  );
};
