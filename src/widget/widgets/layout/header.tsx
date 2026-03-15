import { useWidgetTranslation } from '../../shared/lib/hooks';
import { WidgetLanguageSelector } from '../../shared/ui';
import { LogoIcon } from '../../shared/ui/icons';
import { AutoLayout, SVG } from '../../widget-components';

export const Header = () => {
  const { setLocale } = useWidgetTranslation();

  return (
    <AutoLayout
      verticalAlignItems="center"
      horizontalAlignItems="center"
      direction="vertical"
      padding={{ vertical: 13, horizontal: 16 }}
      fill="#24292F"
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
        <WidgetLanguageSelector onLocaleChange={setLocale} />
      </AutoLayout>
    </AutoLayout>
  );
};
