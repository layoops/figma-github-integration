import type { ChangeEvent } from 'react';

import { useState } from 'react';
import { FormControl, Textarea, TextInput } from '@primer/react';

import { useTranslation } from '@/shared/lib/contexts';
import { Form } from '@/shared/ui';

type FormState = {
  target: string;
  title: string;
  description: string;
};

export const IssueCreateForm = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState<FormState>({
    target: '',
    title: '',
    description: '',
  });

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <Form>
      <FormControl required>
        <FormControl.Label>{t('issueCreateForm.targetField.label')}</FormControl.Label>
        <TextInput
          placeholder={t('issueCreateForm.targetField.placeholder')}
          value={form.target}
          onChange={handleChange('target')}
          type="text"
          size="medium"
          block
        />
        <FormControl.Caption>{t('issueCreateForm.targetField.caption')}</FormControl.Caption>
      </FormControl>

      <FormControl required>
        <FormControl.Label>{t('issueCreateForm.titleField.label')}</FormControl.Label>
        <TextInput
          placeholder={t('issueCreateForm.titleField.placeholder')}
          value={form.title}
          onChange={handleChange('title')}
          type="text"
          size="medium"
          block
        />
        <FormControl.Caption>{t('issueCreateForm.titleField.caption')}</FormControl.Caption>
      </FormControl>

      <FormControl required>
        <FormControl.Label>{t('issueCreateForm.descriptionField.label')}</FormControl.Label>
        <Textarea
          rows={4}
          placeholder={t('issueCreateForm.descriptionField.placeholder')}
          value={form.description}
          onChange={handleChange('description')}
          block
        />
        <FormControl.Caption>{t('issueCreateForm.descriptionField.caption')}</FormControl.Caption>
      </FormControl>
    </Form>
  );
};
