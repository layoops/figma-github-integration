import type { WidgetTheme } from '../../shared/styles/themes';

import { useWidgetTranslation } from '../../shared/lib/hooks';
import { getColorStyles } from '../../shared/styles';
import { WidgetLanguageSelector } from '../../shared/ui';
import { LogoIcon } from '../../shared/ui/icons';
import { AutoLayout, SVG } from '../../widget-components';

type HeaderProps = {
  widgetTheme?: WidgetTheme;
};

export const Header = ({ widgetTheme = 'light' }: HeaderProps) => {
  const { setLocale } = useWidgetTranslation();
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout
      verticalAlignItems="center"
      horizontalAlignItems="center"
      direction="vertical"
      padding={{ vertical: 13, horizontal: 16 }}
      fill={colorStyles.header.bg}
      width="fill-parent"
    >
      <AutoLayout
        verticalAlignItems="center"
        horizontalAlignItems="start"
        direction="horizontal"
        width="fill-parent"
        spacing="auto"
      >
        <SVG height={36} width={84} src={LogoIcon()} />
        <WidgetLanguageSelector onLocaleChange={setLocale} widgetTheme={widgetTheme} />
      </AutoLayout>
    </AutoLayout>
  );
};
