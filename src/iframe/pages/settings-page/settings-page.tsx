import { SettingsForm } from '@/entities/settings';
import { AccessTokenForm } from '@/features/access';
import { useAppContext } from '@/shared/lib/contexts';
import { PageLayout } from '@/shared/ui/components';

export const SettingsPage = () => {
  const { githubAccessToken } = useAppContext();
  return (
    <PageLayout>
      <AccessTokenForm />
      {githubAccessToken && <SettingsForm />}
    </PageLayout>
  );
};
