import { AutoLayout, Line } from '../../../../widget-components';
import { Colors } from '../../../styles';
import { Avatar } from '../avatar';
import { IconButton } from '../button';
import { CustomText } from '../custom-text';

interface IssueBodyHeaderProps extends AutoLayoutProps {
  left: {
    name?: string;
    avatarUrl?: string;
  };
  right?: {
    text?: {
      text: string;
      url?: string;
    };
    icon?: { src?: string; url?: string };
  };
  hasUnderline?: boolean;
}

export const IssueBodyHeader = ({
  right = undefined,
  hasUnderline = false,
  left,
  ...rest
}: IssueBodyHeaderProps) => {
  return (
    <AutoLayout direction="vertical" spacing={4} width="fill-parent" {...rest}>
      <AutoLayout width="fill-parent" verticalAlignItems="center">
        <Avatar
          width="fill-parent"
          name={'Comment author'}
          size="extra-small"
          textIsHidden={!left.name}
          text={left.name ?? undefined}
          avatarUrl={left.avatarUrl}
        />

        <AutoLayout
          hidden={!right || (!right?.text.text && !right?.icon?.src)}
          width="hug-contents"
          spacing={8}
          verticalAlignItems="center"
        >
          {right?.text.text ? (
            <CustomText
              href={right?.text.url}
              size="extra-small"
              name="Comment updated date"
              width="hug-contents"
              horizontalAlignText="right"
            >
              {right?.text.text}
            </CustomText>
          ) : undefined}
          {right?.icon?.src ? (
            <IconButton
              appearance="ghost"
              size="extra-small"
              onClick={() => {}}
              iconSrc={right?.icon?.src}
              href={right?.icon?.url}
              cornerRadius={6}
            />
          ) : undefined}
        </AutoLayout>
      </AutoLayout>
      {hasUnderline && <Line stroke={Colors.gray[50]} strokeWidth={1} length={'fill-parent'} />}
    </AutoLayout>
  );
};
