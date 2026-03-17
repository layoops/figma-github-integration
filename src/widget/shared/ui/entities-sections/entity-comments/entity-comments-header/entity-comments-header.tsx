import { AutoLayout } from '../../../../../widget-components';
import { CustomText } from '../../../custom-text';

export type EntityCommentsHeaderProps = {
  title?: string;
  link: {
    text: string;
    url: string;
  };
} & AutoLayoutProps;

export const EntityCommentsHeader = ({
  title = undefined,
  link,
  ...rest
}: EntityCommentsHeaderProps) => {
  return (
    <AutoLayout direction="vertical" height="hug-contents" width="fill-parent" {...rest}>
      <AutoLayout
        padding={{ right: 8 }}
        width="fill-parent"
        verticalAlignItems="center"
        spacing={4}
      >
        <AutoLayout width="fill-parent" verticalAlignItems="center" spacing={8}>
          {title && (
            <CustomText size="extra-small" fontWeight={600}>
              {title}
            </CustomText>
          )}
          {link.url && (
            <CustomText
              href={link.url}
              size="extra-small"
              name="Comment updated date"
              width="hug-contents"
              horizontalAlignText="right"
            >
              {link.text}
            </CustomText>
          )}
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
