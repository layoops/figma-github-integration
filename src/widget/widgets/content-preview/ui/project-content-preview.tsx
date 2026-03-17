import { CustomText } from '../../../shared/ui/components';
import { AutoLayout } from '../../../widget-components';

interface ProjectHeaderContentProps extends AutoLayoutProps {
  shortDescription: string;
}

export const ProjectContentPreview = ({ shortDescription, ...rest }: ProjectHeaderContentProps) => {
  return (
    <AutoLayout
      direction="horizontal"
      verticalAlignItems={'center'}
      spacing={6}
      width="fill-parent"
      {...rest}
    >
      <CustomText>{shortDescription}</CustomText>
    </AutoLayout>
  );
};
