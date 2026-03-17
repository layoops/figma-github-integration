import type { IframeTranslationKey } from '@/global-shared/localization';
import type { SelectPanelItemInput } from '@primer/react';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TriangleDownIcon } from '@primer/octicons-react';
import { Button, FormControl, SelectPanel, Textarea, TextInput } from '@primer/react';
import { useStore } from '@tanstack/react-form';

import { useRepositoryLabels } from '@/shared/api/github-labels-query';
import { useTranslation } from '@/shared/lib/contexts';
import { getFirstError } from '@/shared/lib/forms/validation';
import { githubPatterns } from '@/shared/lib/regex';
import { useFormContext } from '@/shared/lib/tanstack-react-form';
import { Form } from '@/shared/ui';

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function useLazyRepositoryLabels(target: string) {
  const debouncedTarget = useDebounce(target, 400);

  const isGithub = useMemo(
    () => Boolean(debouncedTarget && githubPatterns.github.test(debouncedTarget)),
    [debouncedTarget]
  );

  const [enabled, setEnabled] = useState(false);

  const query = useRepositoryLabels(debouncedTarget, {
    enabled,
  });

  const prevTargetRef = useRef<string | null>(null);
  useEffect(() => {
    if (prevTargetRef.current !== debouncedTarget) {
      setEnabled(false);
      prevTargetRef.current = debouncedTarget;
    }
  }, [debouncedTarget]);

  const load = useCallback(async () => {
    if (!isGithub) return;
    setEnabled(true);
    await query.refetch();
  }, [isGithub, query]);

  return {
    ...query,
    isGithub,
    load,
    hasLoaded: enabled,
  };
}

export const IssueCreateForm = () => {
  const { t } = useTranslation();
  const form = useFormContext();

  const target = useStore(form.store, (s) => s.values.target as string);

  const {
    data: labels = [],
    isLoading,
    isGithub,
    load,
    hasLoaded,
  } = useLazyRepositoryLabels(target);

  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const items: SelectPanelItemInput[] = useMemo(() => {
    return labels
      .filter((l) => l.name.toLowerCase().includes(filterValue.toLowerCase()))
      .map((l) => ({
        id: l.id,
        text: l.name,
        leadingVisual: () => (
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: `#${l.color}`,
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        ),
      }));
  }, [labels, filterValue]);

  const handleOpenChange = useCallback(
    async (next: boolean) => {
      setOpen(next);

      if (next && !hasLoaded) {
        await load();
      }

      if (!next) {
        setFilterValue('');
      }
    },
    [hasLoaded, load]
  );

  return (
    <Form>
      <form.Field
        name={'target' as never}
        children={(field) => {
          const errors = field.state.meta.errors;

          return (
            <FormControl required>
              <FormControl.Label>{t('issueCreateForm.targetField.label')}</FormControl.Label>

              <TextInput
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as never)}
                onBlur={field.handleBlur}
                placeholder={t('issueCreateForm.targetField.placeholder')}
                block
              />
              {errors.length > 0 ? (
                <FormControl.Validation variant="error">
                  {getFirstError(errors)}
                </FormControl.Validation>
              ) : (
                <FormControl.Caption>
                  {t('issueCreateForm.targetField.caption')}
                </FormControl.Caption>
              )}
            </FormControl>
          );
        }}
      />

      <form.Field
        name={'title' as never}
        children={(field) => {
          const errors = field.state.meta.errors;

          return (
            <FormControl required>
              <FormControl.Label>{t('issueCreateForm.titleField.label')}</FormControl.Label>

              <TextInput
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as never)}
                onBlur={field.handleBlur}
                placeholder={t('issueCreateForm.titleField.placeholder')}
                block
              />

              {errors.length > 0 ? (
                <FormControl.Validation variant="error">
                  {getFirstError(errors)}
                </FormControl.Validation>
              ) : (
                <FormControl.Caption>{t('issueCreateForm.titleField.caption')}</FormControl.Caption>
              )}
            </FormControl>
          );
        }}
      />

      <form.Field
        name={'body' as never}
        children={(field) => {
          const errors = field.state.meta.errors;

          return (
            <FormControl>
              <FormControl.Label>{t('issueCreateForm.descriptionField.label')}</FormControl.Label>
              <Textarea
                rows={4}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as never)}
                onBlur={field.handleBlur}
                placeholder={t('issueCreateForm.descriptionField.placeholder')}
                block
              />

              {errors.length > 0 ? (
                <FormControl.Validation variant="error">
                  {getFirstError(errors)}
                </FormControl.Validation>
              ) : (
                <FormControl.Caption>
                  {t('issueCreateForm.descriptionField.caption')}
                </FormControl.Caption>
              )}
            </FormControl>
          );
        }}
      />

      {isGithub && (
        <form.Field
          name={'labelIds' as never}
          children={(field) => {
            const selectedIds: string[] = field.state.value ?? [];

            const selectedItems = items.filter((i) => selectedIds.includes(i.id as string));

            const handleSelectedChange = (items: SelectPanelItemInput[]) => {
              field.handleChange(items.map((i) => i.id as string) as never);
            };

            return (
              <FormControl>
                <FormControl.Label>{t('issueCreateForm.labelsField.label')}</FormControl.Label>
                <Button
                  trailingAction={TriangleDownIcon}
                  ref={buttonRef}
                  onClick={() => {
                    if (!open && !hasLoaded) {
                      load();
                    }
                    setOpen(!open);
                  }}
                >
                  {selectedItems.length > 0
                    ? t('issueCreateForm.labelsField.selection.stats' as IframeTranslationKey, {
                        count: selectedItems.length,
                        selectedCount: selectedItems.length,
                      })
                    : t('issueCreateForm.labelsField.placeholder')}
                </Button>
                <SelectPanel
                  height="small"
                  width="small"
                  open={open}
                  title={t('issueCreateForm.labelsField.label')}
                  placeholderText={t('issueCreateForm.labelsField.filterPlaceholder')}
                  placeholder={t('issueCreateForm.labelsField.placeholder')}
                  onOpenChange={handleOpenChange}
                  items={items}
                  selected={selectedItems}
                  anchorRef={buttonRef}
                  renderAnchor={null}
                  onSelectedChange={handleSelectedChange}
                  onFilterChange={setFilterValue}
                  loading={isLoading}
                  initialLoadingType="spinner"
                  message={
                    !isLoading && items.length === 0
                      ? {
                          variant: 'empty',
                          title: t('issueCreateForm.labelsField.emptyTitle'),
                          body: t('issueCreateForm.labelsField.emptyBody'),
                        }
                      : undefined
                  }
                />
                <FormControl.Caption>
                  {t('issueCreateForm.labelsField.caption')}
                </FormControl.Caption>
              </FormControl>
            );
          }}
        />
      )}
    </Form>
  );
};
