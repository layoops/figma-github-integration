import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, Line } from '../../../widget-components';
import { getColorStyles } from '../../styles';
import { Button } from '../buttons';

export type TabProps = {
  text: string;
  state: 'default' | 'selected';
  widgetTheme?: WidgetTheme;
} & AutoLayoutProps;

export const Tab = ({ state, text, widgetTheme = 'light', ...rest }: TabProps) => {
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout name="Tab" direction="vertical" spacing={8} {...rest} width="hug-contents">
      <Button
        fontWeight="semi-bold"
        onClick={() => {}}
        appearance="ghost"
        width="hug-contents"
        size="extra-small"
        text={text}
        widgetTheme={widgetTheme}
        fill={state === 'selected' ? colorStyles.surface.muted : undefined}
      />
      <Line
        opacity={state !== 'selected' ? 0 : 1}
        stroke={colorStyles.fg.accent}
        strokeWidth={2}
        length="fill-parent"
      />
    </AutoLayout>
  );
};
