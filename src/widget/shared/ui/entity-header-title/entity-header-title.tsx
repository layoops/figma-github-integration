import { AutoLayout } from '../../../widget-components';
import { palette } from '../../styles';
import { CustomLink } from '../custom-link';

export type EntityHeaderTitleProps = {
  text: string;
  href?: string;
  preLinkChildren?: FigmaDeclarativeNode;
  onClick?: () => void;
};

export const EntityHeaderTitle = ({
  text,
  href,
  preLinkChildren,
  onClick,
}: EntityHeaderTitleProps) => {
  return (
    <AutoLayout direction="horizontal" spacing={8} width="fill-parent" verticalAlignItems="center">
      {preLinkChildren}
      <CustomLink
        onClick={onClick}
        fill={palette.fgColorMuted}
        width="hug-contents"
        size="small"
        href={href}
      >
        {text}
      </CustomLink>
    </AutoLayout>
  );
};
