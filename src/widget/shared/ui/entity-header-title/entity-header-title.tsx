import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles } from '../../styles';
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
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout direction="horizontal" spacing={8} width="fill-parent" verticalAlignItems="center">
      {preLinkChildren}
      <CustomLink
        onClick={onClick}
        fill={colorStyles.fg.muted}
        width="hug-contents"
        size="small"
        href={href}
      >
        {text}
      </CustomLink>
    </AutoLayout>
  );
};
