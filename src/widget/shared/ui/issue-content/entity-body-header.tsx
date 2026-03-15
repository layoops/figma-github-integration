import { AutoLayout, Line } from '../../../widget-components';
import { ColorStyles } from '../../styles';
import { Avatar } from '../avatar';
import { CustomText } from '../custom-text';

export type EntityBodyHeaderProps = {
  left: {
    avatarUrl?: string;
    title?: string;
    date?: string;
  };
  right?: {
    text?: {
      text: string;
      url?: string;
    };
    icon?: { src?: string; url?: string };
    children?: FigmaDeclarativeNode;
  };
} & AutoLayoutProps;

export const EntityBodyHeader = ({ right = undefined, left, ...rest }: EntityBodyHeaderProps) => {
  return (
    <AutoLayout
      fill={ColorStyles.surface.muted}
      direction="vertical"
      height="hug-contents"
      width="fill-parent"
      {...rest}
    >
      <AutoLayout padding={8} width="fill-parent" verticalAlignItems="center" spacing={4}>
        <AutoLayout width="fill-parent" verticalAlignItems="center" spacing={8}>
          <Avatar
            name="Comment author"
            size="extra-small"
            textIsHidden={!left.title}
            text={left.title ?? undefined}
            avatarUrl={left.avatarUrl}
          />
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
        </AutoLayout>
        {right?.children && (
          <AutoLayout
            hidden={!right || (!right?.text.text && !right?.icon?.src)}
            width="hug-contents"
            spacing={8}
            verticalAlignItems="center"
          >
            {right.children}
          </AutoLayout>
        )}
      </AutoLayout>
      <Line stroke={ColorStyles.border} strokeWidth={1} length="fill-parent" />
    </AutoLayout>
  );
};
