import { Flash, Text } from '@primer/react';

import { AccessTokenForm, GithubAppAuthButton, useTokenHandler } from '@/features/auth';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { PageContentLayout } from '@/widgets/page-content-layout';

export const AuthPage = () => {
  const { t } = useTranslation();

  const { handleToken, isVerifying, error } = useTokenHandler();
  const { githubAccessToken } = useAppContext();

  if (githubAccessToken) {
    return (
      <PageContentLayout title={t('authorizationPage.title')}>
        <Flash variant="success">
          {t('authorizationPage.alreadyLoggedIn')} <br />
          {githubAccessToken.slice(0, 4)}...
        </Flash>
      </PageContentLayout>
    );
  }

  return (
    <PageContentLayout title={t('authorizationPage.title')}>
      <GithubAppAuthButton onTokenReceived={handleToken} isDisabled={isVerifying} />
      <AccessTokenForm onTokenSubmit={handleToken} isLoading={isVerifying} error={error} />
      {error && (
        <Flash variant="danger">
          <Text>
            {t('authorizationPage.tokenVerifyError')}: {error.message}
          </Text>
        </Flash>
      )}
    </PageContentLayout>
  );
};
