import { type FormHTMLAttributes, type ReactNode } from 'react';
import { FormControl } from '@primer/react';

import { useTranslation } from '@/shared/lib/contexts';
import { getFirstError } from '@/shared/lib/forms/validation';
import { useFormContext } from '@/shared/lib/tanstack-react-form/global-form';
import { Form, SearchInputWithButton, type SearchInputWithButtonProps } from '@/shared/ui';

import { searchEntityQuerySuggestionsConfig } from '../../lib';
import classes from './search-entity-form.module.css';

export type SearchEntityFormProps = {
  size?: SearchInputWithButtonProps['size'];
  children?: ReactNode;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'children'>;

export const SearchEntityForm = ({ size, children, ...props }: SearchEntityFormProps) => {
  const { t } = useTranslation();

  const form = useFormContext();

  return (
    <Form {...props} onAction={form.handleSubmit}>
      <form.Field
        name={'query' as never}
        children={(field) => {
          const errors = field.state.meta.errors;
          return (
            <FormControl required>
              <FormControl.Label visuallyHidden>
                {t('issueImportForm.searchField.label')}
              </FormControl.Label>
              <div className={classes['search-input-with-create-button']}>
                <SearchInputWithButton
                  suggestionsConfig={searchEntityQuerySuggestionsConfig}
                  size={size}
                  placeholder={t('issueImportForm.searchField.placeholder')}
                  value={field.state.value}
                  onChange={field.handleChange as never}
                  onBlur={field.handleBlur}
                  loading={field.form.state.isSubmitting && field.form.state.isFormValid}
                />
                {children}
              </div>

              {errors.length > 0 && (
                <FormControl.Validation
                  variant="error"
                  className={classes['input-validation-text']}
                >
                  {getFirstError(errors)}
                </FormControl.Validation>
              )}
            </FormControl>
          );
        }}
      />
    </Form>
  );
};
