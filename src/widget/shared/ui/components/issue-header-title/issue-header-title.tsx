import { AutoLayout } from '../../../../widget-components';
import { CustomLink } from '../custom-link';

interface IssueHeaderTitleProps {
  text: string;
  href?: string;
  preLinkChildren?: FigmaDeclarativeNode;
}

export const IssueHeaderTitle = ({ text, href, preLinkChildren }: IssueHeaderTitleProps) => {
  return (
    <AutoLayout direction="horizontal" spacing={8} width="fill-parent" verticalAlignItems="center">
      {preLinkChildren}
      <CustomLink fill={'#57606A'} width={'hug-contents'} size="small" href={href}>
        {text}
      </CustomLink>
    </AutoLayout>
  );
};
