import type { Ref } from 'react';

import { SearchIcon } from '@primer/octicons-react';
import { IconButton } from '@primer/react';
import clsx from 'clsx';

import { useTranslation } from '@/shared/lib/contexts';

import {
  GithubQueryBuilderInput,
  type GithubQueryBuilderInputProps,
} from '../github-query-builder-input';
import classes from './search-input-with-button.module.css';

export type SearchInputWithButtonProps = {
  onClick?: () => void;
  size?: 'small' | 'medium';
  loading?: boolean;
  ref?: Ref<HTMLDivElement>;
} & Omit<GithubQueryBuilderInputProps, 'size'>;

export const SearchInputWithButton = ({
  onClick,
  size = 'medium',
  loading = false,
  onChange,
  className,
  ref,
  ...props
}: SearchInputWithButtonProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes['search-input-with-button']}>
      <GithubQueryBuilderInput
        className={clsx(classes.input, className)}
        onChange={onChange}
        ref={ref}
        {...props}
      />

      <IconButton
        size={size}
        className={classes.button}
        type="submit"
        icon={SearchIcon}
        aria-label={t('uiComponents.searchField.tooltipText')}
        onClick={onClick}
        loading={loading}
      />
    </div>
  );
};
