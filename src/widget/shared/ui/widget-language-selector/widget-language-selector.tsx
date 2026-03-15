import type { Locale } from '../../../../global-shared/localization/types';

import { AutoLayout, SVG, Text } from '../../../widget-components';
import { useWidgetTranslation } from '../../lib/hooks';
import { iconStyles } from '../../styles';
import { IconGlobe } from '../icons';

export type WidgetLanguageSelectorProps = {
  onLocaleChange?: (locale: Locale) => void;
};

export const WidgetLanguageSelector = ({ onLocaleChange }: WidgetLanguageSelectorProps) => {
  const { locale: currentLocale, setLocale } = useWidgetTranslation();

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
      fill="#F6F8FA"
      stroke="#D0D7DE"
      strokeWidth={1}
      tooltip="Switch language / Переключить язык"
    >
      <SVG
        src={IconGlobe('#656D76')}
        width={iconStyles.sizing.small}
        height={iconStyles.sizing.small}
      />
      <Text fontSize={10} fontFamily="Inter" fontWeight={500} fill="#656D76">
        {currentLocale === 'en' ? 'EN' : 'RU'}
      </Text>
    </AutoLayout>
  );
};
