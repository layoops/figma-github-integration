import { Button } from '@primer/react';

import { SettingsForm } from '@/entities/settings';
import { useTranslation } from '@/shared/lib/contexts';
import { PageContentLayout } from '@/widgets/page-content-layout';

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <PageContentLayout
      title={t('settingsPage.title')}
      footerRight={
        <Button type="submit" form="settings-form" variant="primary">
          {t('settingsForm.submitButton')}
        </Button>
      }
    >
      <SettingsForm />
    </PageContentLayout>
  );
};
