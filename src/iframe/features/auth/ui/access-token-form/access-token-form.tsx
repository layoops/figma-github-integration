import type { FormEvent } from 'react';

import { useState } from 'react';
import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react';
import { Button, FormControl, Link, TextInput } from '@primer/react';

import { useTranslation } from '@/shared/lib/contexts';
import { Form } from '@/shared/ui';

type AccessTokenFormProps = {
  onTokenSubmit: (token: string) => void;
  isLoading: boolean;
  error: Error | null;
};

export const AccessTokenForm = ({ onTokenSubmit, isLoading, error }: AccessTokenFormProps) => {
  const { t } = useTranslation();
  const [token, setToken] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (token) onTokenSubmit(token);
  };

  return (
    <Form
      onAction={onSubmit}
      error={
        error
          ? { title: t('authorizationPage.form.tokenErrorTitle'), description: error.message }
          : undefined
      }
      footer={
        <Button loading={isLoading} type="submit" block>
          {t('authorizationPage.form.saveManualToken')}
        </Button>
      }
    >
      <FormControl>
        <FormControl.Label>{t('ui.accessTokenWithScope')}</FormControl.Label>
        <TextInput
          type={isHidden ? 'password' : 'text'}
          block
          value={token}
          onChange={(e) => setToken(e.target.value)}
          trailingAction={
            <TextInput.Action
              onClick={() => setIsHidden(!isHidden)}
              icon={isHidden ? EyeIcon : EyeClosedIcon}
              aria-label={
                isHidden
                  ? t('authorizationPage.form.showToken')
                  : t('authorizationPage.form.hideToken')
              }
            />
          }
          placeholder="ghp_..."
        />
        <FormControl.Caption>
          <Link href="https://github.com/settings/tokens/new?scopes=repo,read:user" target="_blank">
            {t('authorizationPage.form.generateToken')}
          </Link>
        </FormControl.Caption>
      </FormControl>
    </Form>
  );
};
