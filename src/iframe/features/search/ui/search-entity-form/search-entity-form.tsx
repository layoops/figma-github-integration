import { type FormHTMLAttributes, type ReactNode, type Ref } from 'react';
import { FormControl } from '@primer/react';
import { useStore } from '@tanstack/react-form';

import { useTranslation } from '@/shared/lib/contexts';
import { getFirstError } from '@/shared/lib/forms/validation';
import { useFormContext } from '@/shared/lib/tanstack-react-form/global-form';
import { Form, SearchInputWithButton, type SearchInputWithButtonProps } from '@/shared/ui';

import { searchEntityQuerySuggestionsConfig } from '../../lib';
import classes from './search-entity-form.module.css';

export type SearchEntityFormProps = {
  size?: SearchInputWithButtonProps['size'];
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'children'>;

export const SearchEntityForm = ({ size, children, ref, ...props }: SearchEntityFormProps) => {
  const { t } = useTranslation();

  const form = useFormContext();
  const isLoading = useStore(form.store, (state) => state.isSubmitting && state.isValid);

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
                  loading={isLoading}
                  ref={ref}
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
