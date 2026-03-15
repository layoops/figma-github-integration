import type { ApplicationSettings, ContentSettings } from '@/shared/lib/types';

import { CheckboxGroup, FormControl, Select, Text, TextInput } from '@primer/react';
import { useForm } from '@tanstack/react-form';

import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { CheckboxField, Form } from '@/shared/ui';

import { sendSettingsToParent } from '../utils';

const contentDefaults: ContentSettings = {
  includeComments: true,
  includeLabels: true,
  includeAssignees: false,
  includeProjects: false,
  includeMilestone: false,
  includeRelationship: true,
  includeDevelopment: false,
};

const projectDefaultFormData: ApplicationSettings['project'] = {
  customField: 'Status',
};

const CONTENT_FIELD_KEYS: (keyof ContentSettings)[] = [
  'includeComments',
  'includeAssignees',
  'includeLabels',
  'includeProjects',
  'includeMilestone',
  'includeRelationship',
  'includeDevelopment',
];

export const SettingsForm = () => {
  const { applicationSettings, setApplicationSettings } = useAppContext();
  const { t, locale, sendLocale: setLocale } = useTranslation();

  const form = useForm({
    defaultValues: {
      locale: applicationSettings?.locale ?? locale ?? 'en',
      theme: applicationSettings?.theme ?? 'auto',
      issue: applicationSettings?.issue ?? contentDefaults,
      pullRequest: applicationSettings?.pullRequest ?? contentDefaults,
      project: applicationSettings?.project ?? projectDefaultFormData,
    },
    onSubmit: async ({ value }) => {
      setApplicationSettings(value);
      if (value.locale !== locale) {
        setLocale(value.locale);
      }
      sendSettingsToParent(value);
    },
  });

  const renderContentSection = (section: 'issue' | 'pullRequest') => (
    <>
      {CONTENT_FIELD_KEYS.map((key) => (
        <form.Field key={`${section}.${key}`} name={`${section}.${key}`}>
          {(field) => (
            <CheckboxField
              checked={field.state.value}
              label={t(`settingsForm.${section}.fields.${key}`)}
              onChange={(val) => field.handleChange(val)}
            />
          )}
        </form.Field>
      ))}
    </>
  );

  return (
    <Form id="settings-form" mode="submit" onAction={form.handleSubmit}>
      <form.Field name="locale">
        {(field) => (
          <FormControl>
            <FormControl.Label>{t('settingsForm.language.label')}</FormControl.Label>
            <Select
              block
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value as any)}
            >
              <Select.Option value="en">{t('settingsForm.language.values.en')}</Select.Option>
              <Select.Option value="ru">{t('settingsForm.language.values.ru')}</Select.Option>
            </Select>
          </FormControl>
        )}
      </form.Field>

      <form.Field name="theme">
        {(field) => (
          <FormControl>
            <FormControl.Label>{t('settingsForm.theme.label')}</FormControl.Label>
            <Select
              block
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value as any)}
            >
              <Select.Option value="auto">{t('settingsForm.theme.values.auto')}</Select.Option>
              <Select.Option value="light">{t('settingsForm.theme.values.light')}</Select.Option>
              <Select.Option value="dark">{t('settingsForm.theme.values.dark')}</Select.Option>
            </Select>
          </FormControl>
        )}
      </form.Field>

      <CheckboxGroup>
        <CheckboxGroup.Label>{t('settingsForm.issue.label')}</CheckboxGroup.Label>
        {renderContentSection('issue')}
      </CheckboxGroup>

      <CheckboxGroup>
        <CheckboxGroup.Label>{t('settingsForm.pullRequest.label')}</CheckboxGroup.Label>
        {renderContentSection('pullRequest')}
      </CheckboxGroup>

      <div>
        <Text as="p" size="small" weight="semibold">
          {t('settingsForm.project.label')}
        </Text>
        <form.Field name="project.customField">
          {(field) => (
            <FormControl>
              <FormControl.Label>{t('settingsForm.project.fields.customField')}</FormControl.Label>
              <TextInput
                block
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FormControl.Caption>
                {t('settingsForm.project.fields.customFieldCaption')}
              </FormControl.Caption>
            </FormControl>
          )}
        </form.Field>
      </div>
    </Form>
  );
};
