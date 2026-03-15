import { FormControl, Textarea, TextInput } from '@primer/react';

import { useTranslation } from '@/shared/lib/contexts';
import { getFirstError } from '@/shared/lib/forms/validation';
import { useFormContext } from '@/shared/lib/tanstack-react-form/global-form';
import { Form } from '@/shared/ui';

export const IssueCreateForm = () => {
  const { t } = useTranslation();
  const form = useFormContext();

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
                placeholder={t('issueCreateForm.targetField.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as never)}
                onBlur={field.handleBlur}
                type="text"
                size="medium"
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
                placeholder={t('issueCreateForm.titleField.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as never)}
                onBlur={field.handleBlur}
                type="text"
                size="medium"
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
                placeholder={t('issueCreateForm.descriptionField.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as never)}
                onBlur={field.handleBlur}
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
    </Form>
  );
};
