import type { Locale } from '../../../../global-shared/localization/types';
import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, SVG, Text } from '../../../widget-components';
import { useWidgetTranslation } from '../../lib/hooks';
import { getColorStyles, iconStyles } from '../../styles';
import { IconGlobe } from '../icons';

export type WidgetLanguageSelectorProps = {
  onLocaleChange?: (locale: Locale) => void;
  widgetTheme?: WidgetTheme;
};

export const WidgetLanguageSelector = ({
  onLocaleChange,
  widgetTheme = 'light',
}: WidgetLanguageSelectorProps) => {
  const { locale: currentLocale, setLocale } = useWidgetTranslation();
  const colorStyles = getColorStyles(widgetTheme);

  const handleLanguageToggle = () => {
    const nextLocale: Locale = currentLocale === 'en' ? 'ru' : 'en';
    setLocale(nextLocale);
    if (onLocaleChange) {
      onLocaleChange(nextLocale);
    }
  };

  return (
    <AutoLayout
      onClick={handleLanguageToggle}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      spacing={4}
      padding={{ vertical: 4, horizontal: 8 }}
      cornerRadius={4}
      fill={colorStyles.button.secondary.bg}
      stroke={colorStyles.button.secondary.border}
      strokeWidth={1}
      tooltip="Switch language / Переключить язык"
    >
      <SVG
        src={IconGlobe(colorStyles.fg.muted)}
        width={iconStyles.sizing.small}
        height={iconStyles.sizing.small}
      />
      <Text fontSize={10} fontFamily="Inter" fontWeight={500} fill={colorStyles.fg.muted}>
        {currentLocale === 'en' ? 'EN' : 'RU'}
      </Text>
    </AutoLayout>
  );
};
