import type { IframeTranslationKey } from '@/global-shared/localization';

import { Button, Text } from '@primer/react';

import { useTranslation } from '@/shared/lib/contexts';

import classes from './entity-list-header.module.css';

type FilterOption<T extends string> = {
  key: T;
  labelKey: IframeTranslationKey;
  count?: number;
};

type EntityListHeaderProps<T extends string> = {
  totalCount?: number;
  options: FilterOption<T>[];
  activeFilter: T;
  onFilterChange: (key: T) => void;
  selectedCount: number;
  onUnselectAll: () => void;
  selectionTranslationKey?: IframeTranslationKey;
};

export const EntityListHeader = <T extends string>({
  totalCount = 0,
  options,
  activeFilter,
  onFilterChange,
  selectedCount,
  onUnselectAll,
  selectionTranslationKey,
}: EntityListHeaderProps<T>) => {
  const { t } = useTranslation();

  if (selectedCount > 0) {
    return (
      <div className={classes['entity-list-header-selection']}>
        <Text as="span" size="small" weight="semibold">
          {t(selectionTranslationKey as IframeTranslationKey, {
            count: selectedCount,
            selectedCount,
            totalCount,
          })}
        </Text>
        <Button size="small" variant="default" onClick={onUnselectAll}>
          {t('common.unselectAll')}
        </Button>
      </div>
    );
  }

  return (
    <div className={classes['entity-list-header-filters']}>
      {options.map((option) => (
        <Button
          key={option.key}
          size="small"
          variant="invisible"
          onClick={() => onFilterChange(option.key)}
          count={option.count}
        >
          <Text size="small" weight={activeFilter === option.key ? 'semibold' : 'normal'}>
            {t(option.labelKey)}
          </Text>
        </Button>
      ))}
    </div>
  );
};
