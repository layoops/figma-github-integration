import { Button } from '@primer/react';
import { useRouter } from '@tanstack/react-router';

import { IssueCreateForm } from '@/entities/issue';
import { useTranslation } from '@/shared/lib/contexts';
import { CheckboxField } from '@/shared/ui';
import { PageContentLayout } from '@/widgets/page-content-layout';

export const IssueCreatePage = () => {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <PageContentLayout
      title={t('issueCreatePage.title')}
      footerLeft={
        <CheckboxField checked={true} label={t('issueCreatePage.actionImportIssue.label')} />
      }
      footerRight={
        <>
          <Button onClick={() => router.history.back()}>
            {t('issueCreatePage.actionCancel.label')}
          </Button>
          <Button variant="primary" disabled>
            {t('issueCreatePage.actionCreate.label')}
          </Button>
        </>
      }
    >
      <IssueCreateForm />
    </PageContentLayout>
  );
};
