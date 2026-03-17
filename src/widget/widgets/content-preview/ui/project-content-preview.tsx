import { CustomText } from '../../../shared/ui';
import { AutoLayout } from '../../../widget-components';

type ProjectHeaderContentProps = {
  shortDescription: string;
} & AutoLayoutProps;

export const ProjectContentPreview = ({ shortDescription, ...rest }: ProjectHeaderContentProps) => {
  return (
    <AutoLayout
      direction="horizontal"
      verticalAlignItems="center"
      spacing={6}
      width="fill-parent"
      {...rest}
    >
      <CustomText>{shortDescription}</CustomText>
    </AutoLayout>
  );
};
