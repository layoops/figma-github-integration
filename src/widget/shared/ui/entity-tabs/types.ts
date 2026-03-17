import type { WidgetTranslationKey } from '../../../../global-shared/localization';

export type EntityTabConfig<T extends string> = {
  key: T;
  labelKey: WidgetTranslationKey;
};
